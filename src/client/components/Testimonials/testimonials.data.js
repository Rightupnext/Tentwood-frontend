import { Users, Award, MapPin, TrendingUp } from "lucide-react";

export const testimonials = [
    {
      name: "Robert Kcarery",
      location: "New York, USA",
      packageName: "Bali Paradise Tour",
      duration: "7 Days / 6 Nights",
      rating: 5,
      date: "December 2024",
      category: "Beach & Culture",
      text: "I had the most amazing trip of my life! Everything, including the guided excursions and the airport pickup, was meticulously organized. The itinerary was well-balanced, and the accommodations were excellent. This package exceeded all my expectations!",
      destinationImage:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
      highlights: ["5-Star Hotels", "Private Tour Guide", "All Meals Included"],
    },
    {
      name: "Sarah Mitchell",
      location: "London, UK",
      packageName: "Swiss Alps Adventure",
      duration: "10 Days / 9 Nights",
      rating: 5,
      date: "November 2024",
      category: "Adventure & Nature",
      text: "From start to finish, this was a dream vacation! The attention to detail was incredible, and every moment was perfectly planned. The local guides were knowledgeable and friendly. The mountain views were breathtaking. Highly recommend this package!",
      destinationImage:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
      highlights: ["Mountain Trekking", "Luxury Resorts", "Scenic Train Rides"],
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      packageName: "Japan Family Explorer",
      duration: "14 Days / 13 Nights",
      rating: 5,
      date: "October 2024",
      category: "Family & Culture",
      text: "Traveling with kids can be challenging, but this trip was smooth and enjoyable for everyone. The activities were family-friendly, and the accommodations were spacious and comfortable. Our tour guide made sure everyone was happy. Will definitely book again!",
      destinationImage:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      highlights: [
        "Kid-Friendly Activities",
        "Spacious Suites",
        "Cultural Experiences",
      ],
    },
  ];

export const stats = [
  {
    icon: Users,
    value: "4,500+",
    label: "Happy Travelers",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    value: "98%",
    label: "Satisfaction Rate",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MapPin,
    value: "150+",
    label: "Destinations",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    value: "8 Years",
    label: "Experience",
    color: "from-green-500 to-emerald-500",
  },
];
