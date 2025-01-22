import {
  Avatar,
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
import React, { useMemo, useState } from "react";
import {
  Search as SearchIcon,
  MoreVert as ActionsIcon,
} from "@mui/icons-material";
import { User } from "../../Utils/types";
import { visuallyHidden } from "@mui/utils";
import { DARK } from "../../Utils/colors";

// Types
type Order = "asc" | "desc";

interface HeadCell {
  id: keyof User | "actions";
  label: string;
  numeric: boolean;
  sortable: boolean;
  width?: number;
}

const headCells: HeadCell[] = [
  { id: "avatar", label: "", numeric: false, sortable: false, width: 50 },
  { id: "username", label: "Username", numeric: false, sortable: true },
  { id: "firstName", label: "First Name", numeric: false, sortable: true },
  { id: "lastName", label: "Last Name", numeric: false, sortable: true },
  { id: "email", label: "Email", numeric: false, sortable: true },
  { id: "phoneNumber", label: "Phone", numeric: false, sortable: true },
  {
    id: "membership",
    label: "Membership",
    numeric: false,
    sortable: true,
    width: 120,
  },
  { id: "goal", label: "Goal", numeric: false, sortable: true },
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

interface ProfilesTableProps {
  profiles: User[];
  setFilterAnchorEl: any;
  setSelectedUser: any;
}

const ProfilesTable: React.FC<ProfilesTableProps> = ({
  profiles,
  setFilterAnchorEl,
  setSelectedUser,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("username");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [membershipFilter, setMembershipFilter] = useState<string>("all");

  // Handlers
  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Memoized filtered data
  const filteredProfiles = useMemo(() => {
    return profiles
      .filter((profile) => {
        const searchFields = [
          profile.username,
          profile.firstName,
          profile.lastName,
          profile.email,
          profile.phoneNumber,
          profile.goal,
        ].map((field) => field?.toLowerCase());

        const matchesSearch = searchFields.some((field) =>
          field?.includes(searchQuery.toLowerCase())
        );

        const matchesMembership =
          membershipFilter === "all" || profile.membership === membershipFilter;

        return matchesSearch && matchesMembership;
      })
      .sort(getComparator(order, orderBy));
  }, [profiles, searchQuery, membershipFilter, order, orderBy]);

  // Get unique memberships for filter
  const uniqueMemberships = Array.from(
    new Set(profiles.map((profile) => profile.membership))
  ).filter(Boolean);

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
            Membership Filter
          </InputLabel>
          <Select
            value={membershipFilter}
            label="Membership Filter"
            onChange={(e) => setMembershipFilter(e.target.value)}
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
            <MenuItem value="all">All Memberships</MenuItem>
            {uniqueMemberships.sort().map((membership) => (
              <MenuItem key={membership} value={membership}>
                {membership}
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
          <Table sx={{ minWidth: 750 }} size="medium">
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
                          handleRequestSort(headCell.id as keyof User)
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
              {filteredProfiles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((profile, index) => (
                  <TableRow
                    hover
                    key={profile.id}
                    sx={{
                      bgcolor: DARK ? "secondary.light" : "white",
                      borderLeft: profile.isAdmin ? "4px solid" : "none",
                      borderColor: profile.isAdmin ? "primary.main" : "none",
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
                      <Avatar
                        sx={{
                          transform: profile.isAdmin ? "translateX(-2px)" : "",
                        }}
                        src={profile.avatar}
                        alt={profile.username}
                      >
                        {profile.username[0].toUpperCase()}
                      </Avatar>
                    </TableCell>
                    <TruncatedTableCell>
                      <Tooltip title={profile.username} placement="top">
                        <div className="content">{profile.username}</div>
                      </Tooltip>
                    </TruncatedTableCell>
                    <TruncatedTableCell>
                      <Tooltip title={profile.firstName} placement="top">
                        <div className="content">{profile.firstName}</div>
                      </Tooltip>
                    </TruncatedTableCell>
                    <TruncatedTableCell>
                      <Tooltip title={profile.lastName} placement="top">
                        <div className="content">{profile.lastName}</div>
                      </Tooltip>
                    </TruncatedTableCell>
                    <TruncatedTableCell>
                      <Tooltip title={profile.email} placement="top">
                        <div className="content">
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            {profile.email}
                          </Stack>
                        </div>
                      </Tooltip>
                    </TruncatedTableCell>
                    <TruncatedTableCell>
                      <Tooltip title={profile.phoneNumber} placement="top">
                        <div className="content">
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            {profile.phoneNumber}
                          </Stack>
                        </div>
                      </Tooltip>
                    </TruncatedTableCell>
                    <TableCell
                      sx={{
                        width: 120,
                        textAlign: "center",
                        color: DARK ? "white" : "black",
                      }}
                    >
                      <Chip
                        label={profile.membership || "None"}
                        color={profile.membership ? "primary" : "default"}
                        size="small"
                        sx={{
                          width: 100,
                          textTransform: "capitalize",
                          color: "white",
                        }}
                      />
                    </TableCell>
                    <TruncatedTableCell>
                      <Tooltip title={profile.goal} placement="top">
                        <div className="content">{profile.goal}</div>
                      </Tooltip>
                    </TruncatedTableCell>
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
                          setFilterAnchorEl(e.currentTarget);
                          setSelectedUser(profile);
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
          count={filteredProfiles.length}
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

export default ProfilesTable;
