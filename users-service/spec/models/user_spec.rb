require 'rails_helper'

RSpec.describe User, type: :model do
  
  it "should validate presence of email column" do
    user = User.new(name: 'Dada')
    expect(user).not_to be_valid
  end

  describe "callbacks" do 
    it "generates full name from first_name and last_name" do
      user = User.create(first_name: "Major",last_name: "Ram",email:"major@ram.com",password:"jewel")
      expect(user.name).to eq("Major Ram")
    end

    it "generates name even if first_name or last_name is empty" do
      user = User.create(first_name: "Babu",email: "babu@babubabu.com",password: "baby")
      expect(user.name).to eq("Babu ")
      end
  end
  #Factory Bot
  it "is valid with valid values" do
    user = create(:user)
    expect(user).to be_valid
  end

  it "validates uniqueness of email" do
    user = create(:user ,email: "dada@dada.com")
    user2 = build(:user,email: "dada@dada.com")
    expect(user2).not_to be_valid
    expect(user2.errors[:email]).to include("has already been taken")
  end

  it "authenticates with a valid password" do
    user = create(:user,password: "jewel")
    expect(user.authenticate("jewel")).to eq(user)
  end

  it "does not authenticate with valid password" do 
    user = create(:user,password: "jewel")
    expect(user.authenticate("jewel123")).to be_falsy
  end

  it "generates full name" do
    user = create(:user , first_name: 'ra',last_name: 'da')
    expect(user.name).to eq('ra da')
  end

    

end
