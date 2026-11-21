const mongoose = require('mongoose');
const User = require('./models/User');
const Shipment = require('./models/Shipment');
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  console.log('✅ Connected to MongoDB Atlas');

  const defaultPassword = 'password123';

  // Comprehensive User Directory with distinct User IDs across all roles
  const demoAccounts = [
    // --- Administrators ---
    {
      userId: 'ADM-001',
      name: 'Admin Manager',
      email: 'admin@agribridge.lk',
      password: defaultPassword,
      role: 'Admin',
      phone: '+94 77 100 2001',
      location: { address: 'HQ Agrarian Tower Level 4, Galle Road', city: 'Colombo', district: 'Colombo', lat: 6.9271, lng: 79.8612 }
    },
    {
      userId: 'ADM-002',
      name: 'Dilan Perera (Dispatch Officer)',
      email: 'dilan.dispatch@agribridge.lk',
      password: defaultPassword,
      role: 'Admin',
      phone: '+94 77 100 2002',
      location: { address: 'Central Agrarian Control Tower', city: 'Colombo', district: 'Colombo', lat: 6.9271, lng: 79.8612 }
    },

    // --- Logistics Drivers Fleet ---
    {
      userId: 'DRV-101',
      name: 'Sunil Perera (Express Driver)',
      email: 'sunil.driver@agribridge.lk',
      password: defaultPassword,
      role: 'Driver',
      phone: '+94 71 888 4421',
      location: { address: 'Dambulla Dedicated Economic Centre Freight Yard', city: 'Dambulla', district: 'Matale', lat: 7.8731, lng: 80.6511 },
      driverDetails: {
        vehicleType: 'Refrigerated Truck',
        vehicleNumber: 'WP-LB-9482',
        licenseNumber: 'B-3829104',
        isAvailable: true,
        currentStatus: 'Available',
        rating: 4.9,
        totalDeliveries: 42,
        onTimeDeliveries: 40,
        operatingDistricts: ['Matale', 'Colombo', 'Kandy', 'Kurunegala']
      }
    },
    {
      userId: 'DRV-102',
      name: 'Kamal Bandara (Heavy Cargo Driver)',
      email: 'kamal.driver@agribridge.lk',
      password: defaultPassword,
      role: 'Driver',
      phone: '+94 76 555 1290',
      location: { address: 'Keppetipola Agro Park Transit Station', city: 'Badulla', district: 'Badulla', lat: 6.9934, lng: 81.0550 },
      driverDetails: {
        vehicleType: 'Heavy Lorry',
        vehicleNumber: 'CP-ND-6031',
        licenseNumber: 'B-1092834',
        isAvailable: true,
        currentStatus: 'Available',
        rating: 4.8,
        totalDeliveries: 35,
        onTimeDeliveries: 33,
        operatingDistricts: ['Badulla', 'Nuwara Eliya', 'Colombo']
      }
    },
    {
      userId: 'DRV-103',
      name: 'Priyantha Kumara (Central Highland Route)',
      email: 'priyantha.driver@agribridge.lk',
      password: defaultPassword,
      role: 'Driver',
      phone: '+94 72 333 4455',
      location: { address: 'Peradeniya Freight Terminal', city: 'Kandy', district: 'Kandy', lat: 7.2906, lng: 80.6337 },
      driverDetails: {
        vehicleType: 'Light Truck',
        vehicleNumber: 'CP-GA-2210',
        licenseNumber: 'B-4819201',
        isAvailable: true,
        currentStatus: 'Available',
        rating: 4.7,
        totalDeliveries: 28,
        onTimeDeliveries: 27,
        operatingDistricts: ['Kandy', 'Matale', 'Gampaha', 'Colombo']
      }
    },
    {
      userId: 'DRV-104',
      name: 'Saman Wickramasinghe (Hill Country Pickup)',
      email: 'saman.driver@agribridge.lk',
      password: defaultPassword,
      role: 'Driver',
      phone: '+94 70 444 8899',
      location: { address: 'Boralanda Highland Road', city: 'Nuwara Eliya', district: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891 },
      driverDetails: {
        vehicleType: 'Pickup Van',
        vehicleNumber: 'CP-PX-5544',
        licenseNumber: 'B-2901923',
        isAvailable: true,
        currentStatus: 'Available',
        rating: 4.95,
        totalDeliveries: 50,
        onTimeDeliveries: 48,
        operatingDistricts: ['Nuwara Eliya', 'Badulla', 'Kandy']
      }
    },
    {
      userId: 'DRV-105',
      name: 'Mohamed Rizwan (Northern Corridor Driver)',
      email: 'rizwan.driver@agribridge.lk',
      password: defaultPassword,
      role: 'Driver',
      phone: '+94 75 777 9922',
      location: { address: 'A9 Highway Junction Transit Bay', city: 'Jaffna', district: 'Jaffna', lat: 9.6615, lng: 80.0255 },
      driverDetails: {
        vehicleType: 'Refrigerated Truck',
        vehicleNumber: 'NP-LB-7711',
        licenseNumber: 'B-8192304',
        isAvailable: true,
        currentStatus: 'Available',
        rating: 4.85,
        totalDeliveries: 31,
        onTimeDeliveries: 29,
        operatingDistricts: ['Jaffna', 'Anuradhapura', 'Matale', 'Colombo']
      }
    },

    // --- Sellers / Farmers / Cooperatives ---
    {
      userId: 'SEL-201',
      name: 'Nimal Fernando',
      email: 'nimal.seller@agribridge.lk',
      password: defaultPassword,
      role: 'Seller',
      phone: '+94 78 333 9911',
      location: { address: 'Block 4, Dedicated Economic Centre', city: 'Dambulla', district: 'Matale', lat: 7.8731, lng: 80.6511 }
    },
    {
      userId: 'SEL-202',
      name: 'Keppetipola Farmers Guild',
      email: 'keppetipola.farmers@agribridge.lk',
      password: defaultPassword,
      role: 'Seller',
      phone: '+94 77 444 8822',
      location: { address: 'Highland Farm Valley, Boralanda Road', city: 'Nuwara Eliya', district: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891 }
    },
    {
      userId: 'SEL-203',
      name: 'Rajarata Paddy Cooperative',
      email: 'rajarata.paddy@agribridge.lk',
      password: defaultPassword,
      role: 'Seller',
      phone: '+94 25 222 3344',
      location: { address: 'Paddy Silo #2, Industrial Zone', city: 'Anuradhapura', district: 'Anuradhapura', lat: 8.3114, lng: 80.4037 }
    },
    {
      userId: 'SEL-204',
      name: 'Northern Agro Producers Ltd',
      email: 'northern.agro@agribridge.lk',
      password: defaultPassword,
      role: 'Seller',
      phone: '+94 21 222 9988',
      location: { address: 'Tirunelveli Farmers Market', city: 'Jaffna', district: 'Jaffna', lat: 9.6615, lng: 80.0255 }
    },
    {
      userId: 'SEL-205',
      name: 'Weligama Coconut Growers Association',
      email: 'weligama.coco@agribridge.lk',
      password: defaultPassword,
      role: 'Seller',
      phone: '+94 41 225 1122',
      location: { address: 'Pelena Estate Farmgate', city: 'Matara', district: 'Matara', lat: 5.9549, lng: 80.5550 }
    },
    {
      userId: 'SEL-206',
      name: 'Kandy Organic Spices Collective',
      email: 'kandy.spices@agribridge.lk',
      password: defaultPassword,
      role: 'Seller',
      phone: '+94 81 220 3344',
      location: { address: 'Katugastota Agro Hub', city: 'Kandy', district: 'Kandy', lat: 7.2906, lng: 80.6337 }
    },

    // --- Buyers / Supermarkets / Wholesale Merchants ---
    {
      userId: 'BUY-301',
      name: 'Ruwan Wijesinghe',
      email: 'ruwan.buyer@agribridge.lk',
      password: defaultPassword,
      role: 'Buyer',
      phone: '+94 77 999 5544',
      location: { address: 'Bay 12, Manning Wholesale Market', city: 'Peliyagoda', district: 'Gampaha', lat: 6.9649, lng: 79.8860 }
    },
    {
      userId: 'BUY-302',
      name: 'Lanka Fresh Supermarkets Logistics',
      email: 'lankafresh@agribridge.lk',
      password: defaultPassword,
      role: 'Buyer',
      phone: '+94 11 234 5678',
      location: { address: 'Central Cold Storage, Orugodawatta', city: 'Colombo', district: 'Colombo', lat: 6.9271, lng: 79.8612 }
    },
    {
      userId: 'BUY-303',
      name: 'Green Leaf Distributors',
      email: 'greenleaf.buyers@agribridge.lk',
      password: defaultPassword,
      role: 'Buyer',
      phone: '+94 77 123 7788',
      location: { address: 'Distribution Depot, Negombo Road', city: 'Wattala', district: 'Gampaha', lat: 6.9895, lng: 79.8917 }
    },
    {
      userId: 'BUY-304',
      name: 'Colombo Central Canteen Suppliers',
      email: 'colombo.canteen@agribridge.lk',
      password: defaultPassword,
      role: 'Buyer',
      phone: '+94 71 200 4000',
      location: { address: 'Old Moor Street Bulk Yard', city: 'Colombo', district: 'Colombo', lat: 6.9271, lng: 79.8612 }
    },
    {
      userId: 'BUY-305',
      name: 'Southern Hotels Consortia',
      email: 'southern.hotels@agribridge.lk',
      password: defaultPassword,
      role: 'Buyer',
      phone: '+94 91 223 4455',
      location: { address: 'Fort Commercial Pier Gate', city: 'Galle', district: 'Galle', lat: 6.0535, lng: 80.2210 }
    }
  ];

  // Insert or update users with their custom User IDs
  for (const acc of demoAccounts) {
    const existing = await User.findOne({ email: acc.email });
    if (!existing) {
      const u = new User(acc);
      await u.save();
      console.log(`Seeded user: [${acc.userId}] ${acc.name} (${acc.role})`);
    } else if (!existing.userId) {
      existing.userId = acc.userId;
      await existing.save();
      console.log(`Updated userId for: [${acc.userId}] ${existing.name}`);
    }
  }

  // Retrieve refreshed driver references
  const sunil = await User.findOne({ email: 'sunil.driver@agribridge.lk' });
  const kamal = await User.findOne({ email: 'kamal.driver@agribridge.lk' });
  const priyantha = await User.findOne({ email: 'priyantha.driver@agribridge.lk' });
  const saman = await User.findOne({ email: 'saman.driver@agribridge.lk' });

  // Rich Seed Shipments
  const demoShipments = [
    {
      trackingNumber: 'TRK-2026-88401',
      orderId: 'REQ-379',
      orderTitle: '500kg Premium Willard Mangoes',
      sender: {
        name: 'Nimal Fernando',
        phone: '+94 78 333 9911',
        pickupAddress: 'Block 4, Dedicated Economic Centre',
        city: 'Dambulla',
        district: 'Matale',
        lat: 7.8731,
        lng: 80.6511
      },
      recipient: {
        name: 'Ruwan Wijesinghe',
        phone: '+94 77 999 5544',
        deliveryAddress: 'Bay 12, Manning Wholesale Market',
        city: 'Peliyagoda',
        district: 'Gampaha',
        lat: 6.9649,
        lng: 79.8860
      },
      packageDetails: {
        category: 'Fruits',
        quantity: 500,
        unit: 'kg',
        weightKg: 500,
        specialHandling: 'Perishable / Keep Cool'
      },
      assignedDriver: sunil ? {
        driverId: sunil._id,
        name: sunil.name,
        phone: sunil.phone,
        vehicleType: sunil.driverDetails?.vehicleType,
        vehicleNumber: sunil.driverDetails?.vehicleNumber,
        assignedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
      } : {},
      status: 'In-Transit',
      priority: 'Express',
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000),
      routeOptimization: {
        distanceKm: 148,
        estimatedDurationMinutes: 190,
        optimizedRoute: [
          'Dambulla Economic Center Hub',
          'Kurunegala Central Highway Interchange',
          'Mirigama Logistics Expressway Corridor',
          'Peliyagoda Manning Terminal'
        ]
      },
      trackingTimeline: [
        {
          status: 'Pending',
          location: 'Dambulla Agricultural Center',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          note: 'Harvest graded and packaged into ventilated crates.',
          updatedBy: 'Farmgate Dispatch'
        },
        {
          status: 'Dispatched',
          location: 'Dambulla Freight Hub',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          note: 'Loaded into refrigerated truck WP-LB-9482. Driver departed.',
          updatedBy: 'Driver Sunil Perera'
        },
        {
          status: 'In-Transit',
          location: 'Kurunegala Highway Gateway',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          note: 'Passing Kurunegala checkpoint. Climate control stable at 14°C.',
          updatedBy: 'Driver Sunil Perera'
        }
      ],
      proofOfDelivery: {
        method: 'OTP',
        otp: '492815',
        isVerified: false
      }
    },
    {
      trackingNumber: 'TRK-2026-92140',
      orderId: 'REQ-250',
      orderTitle: '1200kg Upcountry Carrots & Leeks',
      sender: {
        name: 'Keppetipola Farmers Guild',
        phone: '+94 77 444 8822',
        pickupAddress: 'Highland Farm Valley, Boralanda Road',
        city: 'Nuwara Eliya',
        district: 'Nuwara Eliya',
        lat: 6.9497,
        lng: 80.7891
      },
      recipient: {
        name: 'Lanka Fresh Supermarkets Logistics',
        phone: '+94 11 234 5678',
        deliveryAddress: 'Central Cold Storage, Orugodawatta',
        city: 'Colombo',
        district: 'Colombo',
        lat: 6.9271,
        lng: 79.8612
      },
      packageDetails: {
        category: 'Vegetables',
        quantity: 1200,
        unit: 'kg',
        weightKg: 1200,
        specialHandling: 'Heavy Load'
      },
      assignedDriver: kamal ? {
        driverId: kamal._id,
        name: kamal.name,
        phone: kamal.phone,
        vehicleType: kamal.driverDetails?.vehicleType,
        vehicleNumber: kamal.driverDetails?.vehicleNumber,
        assignedAt: new Date(Date.now() - 28 * 60 * 60 * 1000)
      } : {},
      status: 'Delivered',
      priority: 'Standard',
      estimatedDelivery: new Date(Date.now() - 12 * 60 * 60 * 1000),
      actualDelivery: new Date(Date.now() - 11 * 60 * 60 * 1000),
      routeOptimization: {
        distanceKm: 165,
        estimatedDurationMinutes: 240,
        optimizedRoute: ['Nuwara Eliya Depot', 'Gampola Transit', 'Kadugannawa Pass', 'Colombo Orugodawatta']
      },
      trackingTimeline: [
        {
          status: 'Pending',
          location: 'Nuwara Eliya Hub',
          timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000),
          note: 'Sorted and weighed at high-altitude depot.',
          updatedBy: 'Station Supervisor'
        },
        {
          status: 'Dispatched',
          location: 'Keppetipola Station',
          timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000),
          note: 'Loaded on Heavy Lorry CP-ND-6031.',
          updatedBy: 'Driver Kamal Bandara'
        },
        {
          status: 'In-Transit',
          location: 'Peradeniya Highway Section',
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
          note: 'En route without delay.',
          updatedBy: 'Driver Kamal Bandara'
        },
        {
          status: 'Delivered',
          location: 'Orugodawatta Receiving Warehouse',
          timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
          note: 'Goods received in perfect condition. Proof OTP 819203 verified.',
          updatedBy: 'Receiving Officer'
        }
      ],
      proofOfDelivery: {
        method: 'OTP',
        otp: '819203',
        isVerified: true,
        verifiedAt: new Date(Date.now() - 11 * 60 * 60 * 1000),
        notes: 'Signed by Warehouse Manager Priyantha.'
      }
    },
    {
      trackingNumber: 'TRK-2026-61029',
      orderId: 'REQ-108',
      orderTitle: '800kg Organic Red Rice',
      sender: {
        name: 'Rajarata Paddy Cooperative',
        phone: '+94 25 222 3344',
        pickupAddress: 'Paddy Silo #2, Industrial Zone',
        city: 'Anuradhapura',
        district: 'Anuradhapura',
        lat: 8.3114,
        lng: 80.4037
      },
      recipient: {
        name: 'Green Leaf Distributors',
        phone: '+94 77 123 7788',
        deliveryAddress: 'Distribution Depot, Negombo Road',
        city: 'Wattala',
        district: 'Gampaha',
        lat: 6.9895,
        lng: 79.8917
      },
      packageDetails: {
        category: 'Grains',
        quantity: 800,
        unit: 'kg',
        weightKg: 800,
        specialHandling: 'Express Dry'
      },
      status: 'Pending',
      priority: 'Standard',
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000),
      routeOptimization: {
        distanceKm: 195,
        estimatedDurationMinutes: 260,
        optimizedRoute: ['Anuradhapura Agro Zone', 'Kurunegala Junction', 'Ambepussa Corridor', 'Wattala Depot']
      },
      trackingTimeline: [
        {
          status: 'Pending',
          location: 'Anuradhapura Agricultural Storage',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          note: 'Order finalized and moisture levels certified. Ready for driver dispatch.',
          updatedBy: 'Silo Superintendent'
        }
      ],
      proofOfDelivery: {
        method: 'OTP',
        otp: '739104',
        isVerified: false
      }
    },
    {
      trackingNumber: 'TRK-2026-30419',
      orderId: 'REQ-502',
      orderTitle: '350kg Jaffna Red Onions',
      sender: {
        name: 'Northern Agro Producers Ltd',
        phone: '+94 21 222 9988',
        pickupAddress: 'Tirunelveli Farmers Market',
        city: 'Jaffna',
        district: 'Jaffna',
        lat: 9.6615,
        lng: 80.0255
      },
      recipient: {
        name: 'Colombo Central Canteen Suppliers',
        phone: '+94 71 200 4000',
        deliveryAddress: 'Old Moor Street Bulk Yard',
        city: 'Colombo',
        district: 'Colombo',
        lat: 6.9271,
        lng: 79.8612
      },
      packageDetails: {
        category: 'Vegetables',
        quantity: 350,
        unit: 'kg',
        weightKg: 350,
        specialHandling: 'Perishable / Keep Cool'
      },
      status: 'Dispatched',
      isDelayed: true,
      delayReason: 'Heavy monsoon rains and road repairs on A9 Highway section near Medawachchiya.',
      priority: 'Urgent',
      estimatedDelivery: new Date(Date.now() - 5 * 60 * 60 * 1000),
      routeOptimization: {
        distanceKm: 395,
        estimatedDurationMinutes: 480,
        optimizedRoute: ['Jaffna Market', 'Vavuniya Transit', 'Medawachchiya', 'Dambulla', 'Colombo']
      },
      trackingTimeline: [
        {
          status: 'Pending',
          location: 'Jaffna Agrarian Market Hub',
          timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
          note: 'Packed in breathable mesh bags.',
          updatedBy: 'Hub Coordinator'
        },
        {
          status: 'Dispatched',
          location: 'Jaffna Exit Checkpoint',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          note: 'Carrier vehicle dispatched toward Colombo.',
          updatedBy: 'Logistics Desk'
        },
        {
          status: 'In-Transit',
          location: 'Medawachchiya Bypass',
          timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
          note: 'Delayed: Weather conditions and traffic diversion. Driver notified dispatch.',
          updatedBy: 'Control Tower Alert'
        }
      ],
      proofOfDelivery: {
        method: 'OTP',
        otp: '294109',
        isVerified: false
      }
    },
    {
      trackingNumber: 'TRK-2026-74520',
      orderId: 'REQ-614',
      orderTitle: '600 Coconuts (Grade A Fresh Export)',
      sender: {
        name: 'Weligama Coconut Growers Association',
        phone: '+94 41 225 1122',
        pickupAddress: 'Pelena Estate Farmgate',
        city: 'Matara',
        district: 'Matara',
        lat: 5.9549,
        lng: 80.5550
      },
      recipient: {
        name: 'Southern Hotels Consortia',
        phone: '+94 91 223 4455',
        deliveryAddress: 'Fort Commercial Pier Gate',
        city: 'Galle',
        district: 'Galle',
        lat: 6.0535,
        lng: 80.2210
      },
      packageDetails: {
        category: 'Agricultural Produce',
        quantity: 600,
        unit: 'nuts',
        weightKg: 420,
        specialHandling: 'Standard'
      },
      assignedDriver: priyantha ? {
        driverId: priyantha._id,
        name: priyantha.name,
        phone: priyantha.phone,
        vehicleType: priyantha.driverDetails?.vehicleType,
        vehicleNumber: priyantha.driverDetails?.vehicleNumber,
        assignedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      } : {},
      status: 'In-Transit',
      priority: 'Standard',
      estimatedDelivery: new Date(Date.now() + 4 * 60 * 60 * 1000),
      routeOptimization: {
        distanceKm: 45,
        estimatedDurationMinutes: 60,
        optimizedRoute: ['Weligama Coastal Bay', 'Ahangama Transit', 'Galle Fort Terminal']
      },
      trackingTimeline: [
        {
          status: 'Pending',
          location: 'Weligama Estate Hub',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          note: 'De-husked, graded, and loaded into fiber sacks.',
          updatedBy: 'Estate Supervisor'
        },
        {
          status: 'Dispatched',
          location: 'Matara Coast Road',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          note: 'Loaded onto Light Truck CP-GA-2210. Driver underway.',
          updatedBy: 'Driver Priyantha Kumara'
        }
      ],
      proofOfDelivery: {
        method: 'OTP',
        otp: '620194',
        isVerified: false
      }
    }
  ];

  for (const item of demoShipments) {
    const existing = await Shipment.findOne({ trackingNumber: item.trackingNumber });
    if (!existing) {
      await Shipment.create(item);
      console.log(`Seeded shipment: ${item.trackingNumber}`);
    }
  }

  console.log('✅ Seed completed successfully! Total users:', await User.countDocuments());
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
