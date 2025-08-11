require 'rails_helper'

RSpec.describe Product, type: :model do
  
  it "validates presence of name" do
    product = Product.new(sku: 'Hello')
    expect(product).not_to be_valid
  end

  it "is valid with valid values" do
    product = create(:product)
    expect(product).to be_valid
  end

  it "is valid with invalid values" do
    product = build(:product,name: nil)
    expect(product).not_to be_valid
  end

end
