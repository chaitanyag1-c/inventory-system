# backend/db/seeds.rb

puts "Seeding products..."

# Product.create!([
#   {
#     name: "Apple iPhone 15",
#     sku: "IP15-001",
#     description: "Latest Apple iPhone with A16 Bionic chip.",
#     price: 999.99,
#     quantity: 50
#   },
#   {
#     name: "Samsung Galaxy S24",
#     sku: "SGS24-002",
#     description: "Flagship Samsung smartphone with advanced camera system.",
#     price: 899.99,
#     quantity: 40
#   },
#   {
#     name: "Sony WH-1000XM5 Headphones",
#     sku: "SONYXM5-003",
#     description: "Industry-leading noise-canceling over-ear headphones.",
#     price: 399.99,
#     quantity: 25
#   },
#   {
#     name: "MacBook Pro 14-inch",
#     sku: "MBP14-004",
#     description: "Powerful Apple laptop with M2 Pro chip.",
#     price: 1999.99,
#     quantity: 15
#   },
#   {
#     name: "Dell XPS 13",
#     sku: "XPS13-005",
#     description: "Premium Dell ultrabook with InfinityEdge display.",
#     price: 1499.99,
#     quantity: 20
#   }
# ])
Product.create!([
  # Cameras
  {
    name: "Canon EOS R10 Camera",
    sku: "EOSR10-001",
    description: "Mirrorless camera with high-speed autofocus and 24MP sensor.",
    price: 999.99,
    quantity: 10
  },
  {
    name: "Sony Alpha a6400",
    sku: "A6400-002",
    description: "Compact mirrorless camera with 4K video recording.",
    price: 1199.99,
    quantity: 8
  },
  {
    name: "GoPro HERO13 Black",
    sku: "GOPRO13-003",
    description: "Waterproof action camera with 5.6K ultra HD video.",
    price: 509.99,
    quantity: 14
  },
  {
    name: "Nikon Z50 Mirrorless",
    sku: "NIKONZ50-004",
    description: "Versatile mirrorless camera for enthusiasts with Wi-Fi sharing.",
    price: 849.99,
    quantity: 7
  },
  {
    name: "Fujifilm X-T30 II",
    sku: "FUJIXT30-005",
    description: "Retro-style camera with X-Processor 4 and film simulation.",
    price: 899.99,
    quantity: 6
  },
  {
    name: "Panasonic Lumix G85",
    sku: "LUMIXG85-006",
    description: "Mirrorless camera with dual image stabilization.",
    price: 699.99,
    quantity: 12
  },
  {
    name: "Olympus OM-D E-M10 Mark IV",
    sku: "OMDEM10-007",
    description: "Ultra-compact mirrorless with in-body stabilization.",
    price: 649.99,
    quantity: 9
  },
  {
    name: "DJI Pocket 3 Handheld Camera",
    sku: "DJIPOCKET3-008",
    description: "Pocket-sized 4K gimbal camera for creators.",
    price: 419.99,
    quantity: 11
  },

  # TVs
  {
    name: "Samsung QN90C Neo QLED TV 55\"",
    sku: "QN90C-009",
    description: "Flagship 4K smart TV with Quantum Mini LED and HDR.",
    price: 1499.99,
    quantity: 6
  },
  {
    name: "LG C3 OLED Evo 65\"",
    sku: "LGC3-010",
    description: "OLED smart TV with AI-enhanced picture and Dolby Atmos.",
    price: 1999.99,
    quantity: 4
  },
  {
    name: "Sony Bravia XR A95L 77\" OLED",
    sku: "A95L-011",
    description: "Large OLED TV with XR cognitive processing and Google TV.",
    price: 2999.99,
    quantity: 2
  },
  {
    name: "TCL Q7 QLED TV 55\"",
    sku: "TCLQ7-012",
    description: "Affordable QLED smart TV with 120Hz refresh rate.",
    price: 749.99,
    quantity: 8
  },
  {
    name: "Hisense U8K Mini-LED 65\"",
    sku: "U8K65-013",
    description: "4K smart TV with mini-LED and high contrast ratio.",
    price: 999.99,
    quantity: 5
  },
  {
    name: "Vizio M-Series 50\"",
    sku: "VIZIOM50-014",
    description: "Mid-range 4K TV with excellent color reproduction.",
    price: 529.99,
    quantity: 10
  },
  {
    name: "Philips 7805 Series 43\"",
    sku: "PHILIPS43-015",
    description: "Smart Ambilight LED TV for immersive viewing.",
    price: 479.99,
    quantity: 11
  },

  # Smartwatches
  {
    name: "Apple Watch Series 10",
    sku: "AW10-016",
    description: "Latest Apple smartwatch with health sensors and LTE.",
    price: 529.99,
    quantity: 20
  },
  {
    name: "Samsung Galaxy Watch 7",
    sku: "GW7-017",
    description: "Stylish smartwatch with advanced fitness tracking.",
    price: 349.99,
    quantity: 15
  },
  {
    name: "Garmin Venu 3",
    sku: "GARMVEN3-018",
    description: "Premium multisport GPS smartwatch with AMOLED display.",
    price: 439.99,
    quantity: 10
  },
  {
    name: "Fitbit Sense 3",
    sku: "FITBITS3-019",
    description: "Smartwatch with ECG, skin temperature and stress monitor.",
    price: 229.99,
    quantity: 18
  },
  {
    name: "Amazfit GTR 4",
    sku: "AMAZGTR4-020",
    description: "Long battery life smartwatch with 150+ sports modes.",
    price: 199.99,
    quantity: 16
  },
  {
    name: "Fossil Gen 7 Smartwatch",
    sku: "FOSSIL7-021",
    description: "Fashionable Wear OS watch with customizable faces.",
    price: 299.99,
    quantity: 8
  },
  {
    name: "Huawei Watch GT 5 Pro",
    sku: "HUAWEIGT5-022",
    description: "Durable smartwatch with sapphire glass and long battery.",
    price: 329.99,
    quantity: 12
  },
  {
    name: "Mobvoi TicWatch Pro 5",
    sku: "TICW5-023",
    description: "Dual-display smartwatch with Google Assistant.",
    price: 289.99,
    quantity: 9
  },
  {
    name: "Suunto 9 Peak Pro",
    sku: "SUUNTO9-024",
    description: "Rugged GPS smartwatch for adventure enthusiasts.",
    price: 469.99,
    quantity: 7
  },
  {
    name: "Garmin Forerunner 965",
    sku: "FORERUN965-025",
    description: "High-end running smartwatch with AMOLED touch display.",
    price: 599.99,
    quantity: 10
  }
])

puts "✅ Products seeded successfully!"
