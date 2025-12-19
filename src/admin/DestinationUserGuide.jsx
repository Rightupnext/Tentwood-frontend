import React from "react";
import { Card, Table, Tag } from "antd";

const DESTINATION_SAMPLE_DATA = [
  // INDIA
  { country: "India", trip: "India Trips", destination: "Tamil Nadu", type: "cultural" },
  { country: "India", trip: "India Trips", destination: "Kerala", type: "beach" },
  { country: "India", trip: "India Trips", destination: "Rajasthan", type: "historical" },
  { country: "India", trip: "India Trips", destination: "Ladakh", type: "mountain" },
  { country: "India", trip: "India Trips", destination: "Goa", type: "beach" },
  { country: "India", trip: "India Trips", destination: "Rishikesh", type: "adventure" },

  // INTERNATIONAL
  { country: "Japan", trip: "International Trips", destination: "Tokyo", type: "city" },
  { country: "Japan", trip: "International Trips", destination: "Kyoto", type: "historical" },
  { country: "Thailand", trip: "International Trips", destination: "Phuket", type: "beach" },
  { country: "France", trip: "International Trips", destination: "Paris", type: "city" },
  { country: "Switzerland", trip: "International Trips", destination: "Interlaken", type: "mountain" },

  // GROUP TOURS
  { country: "India", trip: "Group Tours", destination: "Golden Triangle", type: "region" },
  { country: "Japan", trip: "Group Tours", destination: "Tokyo–Osaka Circuit", type: "region" },
  { country: "Europe", trip: "Group Tours", destination: "Swiss Highlights", type: "region" },

  // HONEYMOON
  { country: "Maldives", trip: "Honeymoon Packages", destination: "Male", type: "island" },
  { country: "Indonesia", trip: "Honeymoon Packages", destination: "Ubud", type: "resort" },
  { country: "India", trip: "Honeymoon Packages", destination: "Manali", type: "mountain" },
  { country: "Mauritius", trip: "Honeymoon Packages", destination: "Grand Baie", type: "beach" },
];

// 🔹 Common table columns (single source)
const columns = [
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    className: "!font-medium",
  },
  {
    title: "Trip Category",
    dataIndex: "trip",
    key: "trip",
    render: (trip) => (
      <Tag color="blue" className="!px-3 !py-1 !text-sm">
        {trip}
      </Tag>
    ),
  },
  {
    title: "Destination Name",
    dataIndex: "destination",
    key: "destination",
    className: "!font-semibold",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type) => (
      <Tag color="green" className="!uppercase !font-medium">
        {type}
      </Tag>
    ),
  },
];

// 🔹 Helper to filter by trip category
const getDataByTrip = (trip) =>
  DESTINATION_SAMPLE_DATA.filter((d) => d.trip === trip).map((d, i) => ({
    key: `${trip}-${i}`,
    ...d,
  }));

function DestinationUserGuide() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* INDIA TRIPS */}
      <Card title="🇮🇳 India Trips" className="!rounded-xl !shadow-md">
        <Table
          columns={columns}
          dataSource={getDataByTrip("India Trips")}
          pagination={false}
        />
      </Card>

      {/* INTERNATIONAL TRIPS */}
      <Card title="🌍 International Trips" className="!rounded-xl !shadow-md">
        <Table
          columns={columns}
          dataSource={getDataByTrip("International Trips")}
          pagination={false}
        />
      </Card>

      {/* GROUP TOURS */}
      <Card title="👥 Group Tours" className="!rounded-xl !shadow-md">
        <Table
          columns={columns}
          dataSource={getDataByTrip("Group Tours")}
          pagination={false}
        />
      </Card>

      {/* HONEYMOON PACKAGES */}
      <Card title="💑 Honeymoon Packages" className="!rounded-xl !shadow-md">
        <Table
          columns={columns}
          dataSource={getDataByTrip("Honeymoon Packages")}
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default DestinationUserGuide;
