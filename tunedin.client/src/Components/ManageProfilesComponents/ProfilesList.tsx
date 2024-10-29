import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Stack,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  styled,
} from "@mui/material";
import {
  Search as SearchIcon,
  MoreVert as ActionsIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import ContainerPaper from "../GeneralComponents/ContainerPaper/ContainerPaper";
import { sendGetAllUsers } from "../../Functions/users";
import LoadingIcon from "../GeneralComponents/LoadingIcon/LoadingIcon";
import PageHeader from "../GeneralComponents/PageHeader/PageHeader";

// Types
export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  goal: string;
  membership?: string;
  membershipData?: {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
  };
  avatar: string;
  isAdmin: boolean;
};

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

const ProfilesList: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<User[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("username");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [membershipFilter, setMembershipFilter] = useState<string>("all");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // Effects
  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await sendGetAllUsers();
        if (response?.data) {
          setProfiles(response.data);
        } else {
          setProfiles([]);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfiles();
  }, []);

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

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <ContainerPaper>
      <PageHeader title="Manage Profiles" />
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
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Membership Filter</InputLabel>
            <Select
              value={membershipFilter}
              label="Membership Filter"
              onChange={(e) => setMembershipFilter(e.target.value)}
              MenuProps={{ disableScrollLock: true }}
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
        <Card>
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
                        textAlign: "left",
                        fontWeight: "bold",
                        backgroundColor: "background.paper",
                        position:
                          headCell.id === "actions" ? "sticky" : "sticky",
                        top: 0,
                        right: headCell.id === "actions" ? 0 : "auto",
                        zIndex: headCell.id === "actions" ? 3 : 1,
                        width: headCell.width,
                        "&::after":
                          headCell.id === "actions"
                            ? {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "inherit",
                                zIndex: -1,
                              }
                            : undefined,
                      }}
                    >
                      {headCell.sortable ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={() =>
                            handleRequestSort(headCell.id as keyof User)
                          }
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
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor:
                          index % 2 === 0
                            ? "background.paper"
                            : "background.default",
                        borderLeft: profile.isAdmin ? "4px solid" : "none",
                        borderColor: profile.isAdmin ? "primary.main" : "none",
                      }}
                    >
                      <TableCell
                        sx={{
                          width: 50,
                        }}
                      >
                        <Avatar
                          sx={{
                            transform: profile.isAdmin
                              ? "translateX(-2px)"
                              : "",
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
                      <TableCell sx={{ width: 120, textAlign: "center" }}>
                        <Chip
                          label={profile.membership || "None"}
                          color={profile.membership ? "primary" : "default"}
                          size="small"
                          sx={{
                            width: 100,
                            textTransform: "capitalize",
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
                          backgroundColor:
                            index % 2 === 0
                              ? "background.paper"
                              : "background.default",
                          zIndex: 1,
                        }}
                      >
                        {/* Actions */}
                        <IconButton
                          size="small"
                          onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                        >
                          <ActionsIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                {/* Empty rows to maintain minimum height */}
                {Array.from(
                  Array(Math.max(10 - filteredProfiles.length, 0))
                ).map((_, index) => (
                  <TableRow key={`empty-${index}`} sx={{ height: 53 }}>
                    <TableCell colSpan={9} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProfiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Stack>

      {/* Actions Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
        disableScrollLock
      >
        <MenuItem onClick={() => setFilterAnchorEl(null)}>
          Visit Profile
        </MenuItem>
        <MenuItem onClick={() => setFilterAnchorEl(null)}>
          Send Message
        </MenuItem>
      </Menu>
    </ContainerPaper>
  );
};

export default ProfilesList;
