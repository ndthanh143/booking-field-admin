import { Handshake, People } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { CategoryScale, ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { RoleEnum } from '@/common/enums/role.enum';
import { userKeys } from '@/services/user/user.query';

ChartJS.register(CategoryScale);

const userChartOptions: ChartOptions<'bar'> = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const listYear = Array(5)
  .fill(null)
  .map((_, index) => new Date().getFullYear() - index);

export const Dashboard = () => {
  const currentDate = new Date();

  const [year, setYear] = useState(currentDate.getFullYear());
  const [role, setRole] = useState(RoleEnum.User);

  const userAnalystInstance = userKeys.report({ year, role });
  const { data, refetch } = useQuery(userAnalystInstance);

  const userInstance = userKeys.list();
  const { data: usersList } = useQuery(userInstance);

  const ownerInstance = userKeys.list({ role: RoleEnum.Owner });
  const { data: ownerList } = useQuery(ownerInstance);

  const usersChartData: ChartData<'bar'> = {
    labels: data?.map((item) => `${moment(new Date(item.month)).month('').format('MMMM')}`),
    datasets: [
      {
        label: 'Number of registered users',
        data: data?.map((item) => item.total) || [],
      },
    ],
  };

  useEffect(() => {
    refetch();
  }, [year, role, refetch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card sx={{ backgroundImage: 'linear-gradient(to right, #0606ab, #4f4fff)', color: 'primary.contrastText' }}>
          <CardContent>
            <People />
            <Box>{usersList && <CountUp end={usersList.pageInfo.count} />}</Box>
            <Typography variant='body2'>Total users</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ backgroundImage: 'linear-gradient(to right, #025e38, #18bb78)', color: 'primary.contrastText' }}>
          <CardContent>
            <Handshake />
            <Box>{ownerList && <CountUp end={ownerList.pageInfo.count} />}</Box>
            <Typography variant='body2'>Total Venue owner</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <Typography fontWeight={500} paddingBottom={1}>
              Registered {role}s by month
            </Typography>
            <Box display='flex' gap={2}>
              <Select
                labelId='year-select'
                id='year-select'
                value={year}
                label='Year'
                color='secondary'
                sx={{ minWidth: 150 }}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {listYear.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              <Select
                labelId='role-select'
                id='role-select'
                value={role}
                label='Role'
                color='secondary'
                sx={{ minWidth: 150 }}
                onChange={(e) => setRole(e.target.value as RoleEnum)}
              >
                {Object.values(RoleEnum).map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </Box>
            <Bar data={usersChartData} options={userChartOptions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
