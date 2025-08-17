require 'rails_helper'

RSpec.describe "Products API", type: :request do
  let!(:products) { create_list(:product, 3) }
  let(:product_id) { products.first.id }

  describe 'GET /products' do
    before { get '/products' }

    it 'returns all products' do
      expect(JSON.parse(response.body).size).to eq(3)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET /products/:id' do
    before { get "/products/#{product_id}" }

    context 'when found' do
      it 'returns the product' do
        expect(JSON.parse(response.body)['id']).to eq(product_id)
      end
      it 'returns status code 200' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when not found' do
      it 'returns 404' do
        get "/products/0"
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'POST /products' do
    let(:valid_attributes) do
      {
        product: {
          name:        'New Product',
          sku:         'UNIQUE123',
          description: 'A fancy new item',
          price:       100.50,
          quantity:    10
        }
      }
    end

    context 'with valid params' do
      it 'creates a product' do
        expect {
          post '/products', params: valid_attributes
        }.to change(Product, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)['name']).to eq('New Product')
      end
    end

    context 'with invalid params' do
      it 'returns errors and 422' do
        post '/products', params: { product: { name: '' } }
        expect(response).to have_http_status(:unprocessable_content)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end
  end

  describe 'PUT /products/:id' do
    let(:update_params) { { product: { name: 'Updated Name' } } }

    context 'with valid params' do
      it 'updates the product' do
        put "/products/#{product_id}", params: update_params
        expect(response).to have_http_status(:ok)
        expect(Product.find(product_id).name).to eq('Updated Name')
      end
    end

    context 'with invalid params' do
      it 'returns errors and 422' do
        put "/products/#{product_id}", params: { product: { name: '' } }
        expect(response).to have_http_status(:unprocessable_content)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end
  end

  describe 'DELETE /products/:id' do
    it 'deletes the product' do
      expect {
        delete "/products/#{product_id}"
      }.to change(Product, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
