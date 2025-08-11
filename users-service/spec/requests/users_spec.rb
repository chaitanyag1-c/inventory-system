require 'rails_helper'

RSpec.describe "Users", type: :request do
  def json
    JSON.parse(response.body)
  end
  
  describe "POST /signup" do

    context "Valid request" do
      let(:valid_attributes) do
        {
          email: 'test@example.com',
          password: 'password123',
          password_confirmation: 'password123',
          first_name: 'Test',
          last_name: 'Rest'
        }
      end
      before { post '/signup', params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(:created)
      end

      it 'returns a token' do
        expect(json['token']).not_to be_nil
      end
      it 'return a user email' do
        expect(json['user']['email']).to eq('test@example.com')
      end
    end

    context "invlaid request" do
      let(:in_valid_attributes) do
        {
          email: "ababa@gmail.com"
        }
      end

      before {post '/signup',params: in_valid_attributes}

      it "does not create a user" do
        expect(json['errors']).not_to be_empty
      end

      it "return 502 status" do
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

end
