FactoryBot.define do
  factory :product do
    name        { Faker::Commerce.product_name }
    sku         { Faker::Alphanumeric.unique.alpha(number: 10).upcase }
    description { Faker::Lorem.sentence(word_count: 8) }
    price       { Faker::Commerce.price(range: 0.5..9999.99, as_string: false) }
    quantity    { Faker::Number.between(from: 0, to: 500) }
  end
end
