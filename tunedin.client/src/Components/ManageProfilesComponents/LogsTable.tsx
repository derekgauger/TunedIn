/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  MoreVert as ActionsIcon,
} from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import { Log } from "../../Utils/types";
import { DARK } from "../../Utils/colors";

// Types
type Order = "asc" | "desc";

interface HeadCell {
  id: keyof Log | "actions";
  label: string;
  numeric: boolean;
  sortable: boolean;
  width?: number;
}

const headCells: HeadCell[] = [
  { id: "id", label: "Log ID", numeric: false, sortable: true, width: 120 },
  { id: "type", label: "Type", numeric: false, sortable: true, width: 100 },
  { id: "message", label: "Message", numeric: false, sortable: true },
  {
    id: "createdAt",
    label: "Created At",
    numeric: false,
    sortable: true,
    width: 200,
  },
  {
    id: "actions",
    label: "Actions",
    numeric: false,
    sortable: false,
    width: 50,
  },
];

// Styled Components
const TruncatedTableCell = styled(TableCell)({
  maxWidth: 200,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  position: "relative",
  color: DARK ? "white" : "black",
  "& .content": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

// Helper Functions
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface LogsTableProps {
  logs: Log[];
  setSelectedLog: any;
  setActionAnchorEl: any;
}

const LogsTable: React.FC<LogsTableProps> = ({
  logs,
  setSelectedLog,
  setActionAnchorEl,
}) => {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Log>("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Handlers
  const handleRequestSort = (property: keyof Log) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Memoized filtered data
  const filteredLogs = useMemo(() => {
    return logs
      .filter((log) => {
        const searchFields = [
          log.id,
          log.type,
          log.message,
          new Date(log.createdAt).toLocaleString(),
        ].map((field) => field?.toString().toLowerCase());

        const matchesSearch = searchFields.some((field) =>
          field?.toString().includes(searchQuery.toLowerCase())
        );

        const matchesType = typeFilter === "all" || log.type === typeFilter;

        return matchesSearch && matchesType;
      })
      .sort(getComparator(order, orderBy));
  }, [logs, searchQuery, typeFilter, order, orderBy]);

  const uniqueTypes = Array.from(new Set(logs.map((log) => log.type))).filter(
    Boolean
  );

  return (
    <Stack spacing={3}>
      {/* Filters and Search */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          placeholder="Search profiles..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            minWidth: 300,
            "& .MuiOutlinedInput-root": {
              color: DARK ? "white" : "black",
              "& fieldset": {
                borderColor: DARK ? "rgba(255, 255, 255, 0.23)" : undefined,
              },
              "&:hover fieldset": {
                borderColor: DARK ? "white" : undefined,
              },
            },
            "& .MuiInputLabel-root": {
              color: DARK ? "white" : "black",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: DARK ? "white" : undefined }} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl
          size="small"
          sx={{
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              color: DARK ? "white" : "black",
              "& fieldset": {
                borderColor: DARK ? "rgba(255, 255, 255, 0.23)" : undefined,
              },
              "&:hover fieldset": {
                borderColor: DARK ? "white" : undefined,
              },
            },
            "& .MuiInputLabel-root": {
              color: DARK ? "white" : "black",
            },
          }}
        >
          <InputLabel sx={{ color: DARK ? "white" : "black" }}>
            Type Filter
          </InputLabel>
          <Select
            value={typeFilter}
            label="Type Filter"
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={{
              borderRadius: 0,
            }}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: {
                  border: "1px solid gray",
                  bgcolor: "secondary.light",
                  color: "white",
                  "& .MuiMenuItem-root:hover": {
                    bgcolor: "secondary.dark",
                  },
                },
              },
            }}
          >
            <MenuItem value="all">All Types</MenuItem>
            {uniqueTypes.sort().map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <Card
        sx={{
          bgcolor: DARK ? "secondary.light" : "white",
          color: DARK ? "white" : "black",
        }}
      >
        <TableContainer>
          <Table className="min-w-[750px]" size="medium">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{
                      color: DARK ? "white" : "black",
                      borderBottom: DARK
                        ? "1px solid rgba(255, 255, 255, 0.12)"
                        : "1px solid rgba(0, 0, 0, 0.12)",
                      textAlign: "left",
                      fontWeight: "bold",
                      position: headCell.id === "actions" ? "sticky" : "sticky",
                      top: 0,
                      right: headCell.id === "actions" ? 0 : "auto",
                      zIndex: headCell.id === "actions" ? 3 : 1,
                      width: headCell.width,
                      bgcolor: DARK ? "secondary.light" : "white",
                    }}
                  >
                    {headCell.sortable ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={() =>
                          handleRequestSort(headCell.id as keyof Log)
                        }
                        sx={{
                          color: DARK ? "white !important" : "black !important",
                          "&.MuiTableSortLabel-active": {
                            color: DARK
                              ? "white !important"
                              : "black !important",
                          },
                          "& .MuiTableSortLabel-icon": {
                            color: DARK
                              ? "white !important"
                              : "black !important",
                          },
                        }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((log) => (
                  <TableRow
                    hover
                    key={log.id}
                    sx={{
                      bgcolor: DARK ? "secondary.light" : "white",
                      "&:hover": {
                        bgcolor: "secondary.dark",
                      },
                      "& td": {
                        borderBottom: DARK
                          ? "1px solid rgba(255, 255, 255, 0.12)"
                          : "1px solid rgba(0, 0, 0, 0.12)",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ width: 50, color: DARK ? "white" : "black" }}
                    >
                      {log.id}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={log.type || "None"}
                        color={log.type ? "primary" : "default"}
                        size="small"
                        sx={{
                          width: 100,
                          textTransform: "capitalize",
                          color: "white",
                        }}
                      />
                    </TableCell>
                    <TruncatedTableCell>
                      <Tooltip title={log.message}>
                        <div className="content">{log.message}</div>
                      </Tooltip>
                    </TruncatedTableCell>
                    <TableCell
                      sx={{
                        width: 120,
                        textAlign: "center",
                        color: DARK ? "white" : "black",
                      }}
                    >
                      {new Date(log.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 50,
                        textAlign: "center",
                        position: "sticky",
                        right: 0,
                        bgcolor: DARK ? "secondary.light" : "white",
                        color: DARK ? "white" : "black",
                        zIndex: 1,
                        borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ color: DARK ? "white" : "black" }}
                        onClick={(e) => {
                          setActionAnchorEl(e.currentTarget);
                          setSelectedLog(log);
                        }}
                      >
                        <ActionsIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          SelectProps={{ MenuProps: { disableScrollLock: true } }}
          component="div"
          count={filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: DARK ? "white" : "black",
            "& .MuiIconButton-root": {
              color: DARK ? "white" : "black",
            },
            "& .MuiSelect-icon": {
              color: DARK ? "white" : "black",
            },
          }}
        />
      </Card>
    </Stack>
  );
};

export default LogsTable;
