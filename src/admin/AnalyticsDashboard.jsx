import React, { useState } from 'react';
import { Card, Row, Col, Statistic, DatePicker, Select, Table, Progress } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  EyeOutlined,
  TrophyOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock Analytics Data
const revenueData = [
  { month: 'Jan', revenue: 45000, bookings: 85, packages: 12 },
  { month: 'Feb', revenue: 52000, bookings: 98, packages: 15 },
  { month: 'Mar', revenue: 48000, bookings: 92, packages: 13 },
  { month: 'Apr', revenue: 61000, bookings: 115, packages: 18 },
  { month: 'May', revenue: 73000, bookings: 138, packages: 22 },
  { month: 'Jun', revenue: 85000, bookings: 162, packages: 25 },
  { month: 'Jul', revenue: 92000, bookings: 175, packages: 28 },
  { month: 'Aug', revenue: 88000, bookings: 168, packages: 26 },
  { month: 'Sep', revenue: 95000, bookings: 182, packages: 30 },
  { month: 'Oct', revenue: 102000, bookings: 195, packages: 32 },
  { month: 'Nov', revenue: 98000, bookings: 188, packages: 31 },
  { month: 'Dec', revenue: 110000, bookings: 210, packages: 35 },
];

const destinationData = [
  { name: 'Phuket', value: 450, color: '#3b82f6' },
  { name: 'Bali', value: 380, color: '#8b5cf6' },
  { name: 'Maldives', value: 320, color: '#06b6d4' },
  { name: 'Dubai', value: 280, color: '#f59e0b' },
  { name: 'Singapore', value: 250, color: '#10b981' },
  { name: 'Others', value: 420, color: '#6b7280' },
];

const packagePerformance = [
  { package: 'Phuket Adventure', bookings: 210, revenue: 1575000, rating: 4.8, growth: 12 },
  { package: 'Bali Paradise', bookings: 188, revenue: 1410000, rating: 4.7, growth: 8 },
  { package: 'Maldives Luxury', bookings: 165, revenue: 2475000, rating: 4.9, growth: 15 },
  { package: 'Dubai Extravaganza', bookings: 142, revenue: 2130000, rating: 4.6, growth: -3 },
  { package: 'Singapore Explorer', bookings: 128, revenue: 960000, rating: 4.5, growth: 5 },
];

const customerAgeData = [
  { age: '18-25', count: 320 },
  { age: '26-35', count: 580 },
  { age: '36-45', count: 420 },
  { age: '46-55', count: 280 },
  { age: '56+', count: 150 },
];

const bookingSourceData = [
  { source: 'Website', bookings: 850, percentage: 45 },
  { source: 'Mobile App', bookings: 680, percentage: 36 },
  { source: 'Agents', bookings: 285, percentage: 15 },
  { source: 'Others', bookings: 76, percentage: 4 },
];

const monthlyComparison = [
  { month: 'Jan', current: 85, previous: 78 },
  { month: 'Feb', current: 98, previous: 82 },
  { month: 'Mar', current: 92, previous: 88 },
  { month: 'Apr', current: 115, previous: 95 },
  { month: 'May', current: 138, previous: 118 },
  { month: 'Jun', current: 162, previous: 142 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#6b7280'];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('year');

  const columns = [
    {
      title: 'Package Name',
      dataIndex: 'package',
      key: 'package',
      render: (text) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: 'Bookings',
      dataIndex: 'bookings',
      key: 'bookings',
      sorter: (a, b) => a.bookings - b.bookings,
      render: (value) => <span className="text-blue-600 font-medium">{value}</span>,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      sorter: (a, b) => a.revenue - b.revenue,
      render: (value) => <span className="text-green-600 font-medium">₹{value.toLocaleString()}</span>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Progress
            type="circle"
            percent={value * 20}
            width={40}
            format={() => value}
            strokeColor="#fbbf24"
          />
        </div>
      ),
    },
    {
      title: 'Growth',
      dataIndex: 'growth',
      key: 'growth',
      render: (value) => (
        <span className={`flex items-center gap-1 font-semibold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {value >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {Math.abs(value)}%
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-blue-100 text-lg">Comprehensive insights into your travel business</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="mb-6 rounded-xl shadow-md border-0">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Time Range:</span>
                <Select
                  value={timeRange}
                  onChange={setTimeRange}
                  className="w-48"
                  size="large"
                >
                  <Option value="week">Last Week</Option>
                  <Option value="month">Last Month</Option>
                  <Option value="quarter">Last Quarter</Option>
                  <Option value="year">Last Year</Option>
                </Select>
              </div>
            </Col>
            <Col xs={24} md={16}>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-gray-600 font-medium">Custom Range:</span>
                <RangePicker size="large" />
              </div>
            </Col>
          </Row>
        </Card>

        {/* Key Metrics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={12} sm={12} md={6}>
            <Card className="rounded-xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600 font-medium">Total Revenue</span>}
                value={952000}
                precision={0}
                prefix="₹"
                valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                suffix={
                  <span className="text-sm text-green-600 ml-2 flex items-center">
                    <ArrowUpOutlined className="mr-1" /> 12.5%
                  </span>
                }
              />
              <DollarOutlined className="text-4xl text-blue-500 absolute top-6 right-6 opacity-20" />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card className="rounded-xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600 font-medium">Total Bookings</span>}
                value={1891}
                valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                suffix={
                  <span className="text-sm text-green-600 ml-2 flex items-center">
                    <ArrowUpOutlined className="mr-1" /> 8.2%
                  </span>
                }
              />
              <ShoppingOutlined className="text-4xl text-purple-500 absolute top-6 right-6 opacity-20" />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card className="rounded-xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600 font-medium">Active Users</span>}
                value={5847}
                valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
                suffix={
                  <span className="text-sm text-green-600 ml-2 flex items-center">
                    <ArrowUpOutlined className="mr-1" /> 15.3%
                  </span>
                }
              />
              <UserOutlined className="text-4xl text-green-500 absolute top-6 right-6 opacity-20" />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card className="rounded-xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600 font-medium">Avg Rating</span>}
                value={4.7}
                precision={1}
                valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                suffix={
                  <span className="text-sm text-red-600 ml-2 flex items-center">
                    <ArrowDownOutlined className="mr-1" /> 0.2
                  </span>
                }
              />
              <TrophyOutlined className="text-4xl text-yellow-500 absolute top-6 right-6 opacity-20" />
            </Card>
          </Col>
        </Row>

        {/* Revenue & Bookings Trends */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={16}>
            <Card className="rounded-xl shadow-md border-0" title={<span className="text-lg font-bold">Revenue & Bookings Trend</span>}>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (₹)" />
                  <Area type="monotone" dataKey="bookings" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorBookings)" name="Bookings" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card className="rounded-xl shadow-md border-0" title={<span className="text-lg font-bold">Popular Destinations</span>}>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Customer Demographics & Booking Sources */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={12}>
            <Card className="rounded-xl shadow-md border-0" title={<span className="text-lg font-bold">Customer Age Distribution</span>}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerAgeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="age" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="rounded-xl shadow-md border-0" title={<span className="text-lg font-bold">Booking Sources</span>}>
              <div className="space-y-4 pt-4">
                {bookingSourceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{item.source}</span>
                      <span className="text-blue-600 font-bold">{item.bookings} ({item.percentage}%)</span>
                    </div>
                    <Progress 
                      percent={item.percentage} 
                      strokeColor={{
                        '0%': '#3b82f6',
                        '100%': '#8b5cf6',
                      }}
                      showInfo={false}
                      strokeWidth={12}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Monthly Comparison */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24}>
            <Card className="rounded-xl shadow-md border-0" title={<span className="text-lg font-bold">Year-over-Year Comparison</span>}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Current Year"
                    dot={{ fill: '#3b82f6', r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="previous" 
                    stroke="#9ca3af" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Previous Year"
                    dot={{ fill: '#9ca3af', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Package Performance Table */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card className="rounded-xl shadow-md border-0" title={<span className="text-lg font-bold">Top Performing Packages</span>}>
              <Table 
                columns={columns} 
                dataSource={packagePerformance} 
                pagination={false}
                rowKey="package"
                className="custom-table"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}