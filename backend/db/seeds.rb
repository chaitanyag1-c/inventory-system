# backend/db/seeds.rb

puts "Seeding products..."

Product.create!([
  {
    name: "Apple iPhone 15",
    sku: "IP15-001",
    description: "Latest Apple iPhone with A16 Bionic chip.",
    price: 999.99,
    quantity: 50
  },
  {
    name: "Samsung Galaxy S24",
    sku: "SGS24-002",
    description: "Flagship Samsung smartphone with advanced camera system.",
    price: 899.99,
    quantity: 40
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    sku: "SONYXM5-003",
    description: "Industry-leading noise-canceling over-ear headphones.",
    price: 399.99,
    quantity: 25
  },
  {
    name: "MacBook Pro 14-inch",
    sku: "MBP14-004",
    description: "Powerful Apple laptop with M2 Pro chip.",
    price: 1999.99,
    quantity: 15
  },
  {
    name: "Dell XPS 13",
    sku: "XPS13-005",
    description: "Premium Dell ultrabook with InfinityEdge display.",
    price: 1499.99,
    quantity: 20
  }
])

puts "✅ Products seeded successfully!"
