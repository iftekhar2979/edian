// app/api/perfumes/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const perfumes = [
    {
      id: "1",
      name: "Hot Selling 2-Channel 4K Front and 1080P Rear Dash Cam with 1.5 Inch IPS Screen GPS WiFi App Control Loop Recording G-Sensor",
      description: "",
      imageUrl: "https://s.alicdn.com/@sc04/kf/S995e393bdfee49bf9fa02a1cbb7846a0Y/Hot-Selling-2-Channel-4K-Front-and.jpg?hasNWGrade=1",
      price: 850,
    },
    {
      id: "2",
      name: "Stylish Design Car Dash Cam Doble Camara 2K Car Gadgets Night Vision GPS Dashboard Camera with WiFi APP Control",
      description: "",
      imageUrl: "https://s.alicdn.com/@sc04/kf/H80f68829b6ea4be2b26fb1747b3519096/Stylish-Design-Car-Dash-Cam-Doble-Camara.jpg?hasNWGrade=1",
      price: 19.00,
    },
    {
      id: "3",
      name: "G3 Factory Hot Sale No Screen G3 GPS1080p Dash Cam Card Black Box 4G",
      description: "",
      imageUrl: "https://s.alicdn.com/@sc04/kf/Ad3c664d3094a4425a7a841057d83dc1b9/G3-Factory-Hot-Sale-No-Screen-G3.jpg?hasNWGrade=1",
      price: 56,
    },
    {
      id: "4",
      name: "No Screen 4g Sim Cloud Dash Cam Dual Camera Car Dvr with App Live Front and Rear Dual Lens Dashcam with Gps Wifi Dash Cam 1080P",
      description: "",
      imageUrl: "https://s.alicdn.com/@sc04/kf/H5cb43c2eabcb457383e58894bbe68624d/No-Screen-4g-Sim-Cloud-Dash-Cam.jpg?hasNWGrade=1",
      price: 10,
      oldPrice: 14,
      isOnSale: true,
    },
     {
      id: "5",
      name: "Stylish Design Car Dash Cam Doble Camara 2K Car Gadgets Night Vision GPS Dashboard Camera with WiFi APP Control",
      description: "",
      imageUrl: "https://s.alicdn.com/@sc04/kf/H80f68829b6ea4be2b26fb1747b3519096/Stylish-Design-Car-Dash-Cam-Doble-Camara.jpg?hasNWGrade=1",
      price: 19.00,
    },
    {
      id: "6",
      name: "G3 Factory Hot Sale No Screen G3 GPS1080p Dash Cam Card Black Box 4G",
      description: "",
      imageUrl: "https://s.alicdn.com/@sc04/kf/Ad3c664d3094a4425a7a841057d83dc1b9/G3-Factory-Hot-Sale-No-Screen-G3.jpg?hasNWGrade=1",
      price: 56,
    },
    {
      id: "7",
      name: "No Screen 4g Sim Cloud Dash Cam Dual Camera Car Dvr with App Live Front and Rear Dual Lens Dashcam with Gps Wifi Dash Cam 1080P",
      description: "",
      imageUrl: "https://s.alicdn.com/@sc04/kf/H5cb43c2eabcb457383e58894bbe68624d/No-Screen-4g-Sim-Cloud-Dash-Cam.jpg?hasNWGrade=1",
      price: 10,
      oldPrice: 14,
      isOnSale: true,
    },
  ];

  return NextResponse.json(perfumes);
}
