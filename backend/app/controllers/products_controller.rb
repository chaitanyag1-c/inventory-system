class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /products
  def index
    products = Product.all
    products = products.where("name ILIKE ?", "%#{params[:search]}%") if params[:search].present?
    products = products.order(:id).page(params[:page]).per(params[:per_page] || 10)

    render json: {
      data: products,
      pagination: {
        current_page: products.current_page,
        total_pages: products.total_pages,
        total_count: products.total_count
      }
    }
  end

  # GET /products/:id
  def show
    render json: @product
  end

  # POST /products
  def create
    product = Product.new(product_params)
    if product.save
      render json: product, status: :created
    else
      render json: { errors: product.errors.full_messages }, status: :unprocessable_content
    end
  end

  # PATCH/PUT /products/:id
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_content
    end
  end

  # DELETE /products/:id
  def destroy
    @product.deleted_at = Time.now
    @product.save!
    head :no_content
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :sku, :description, :price, :quantity)
  end
end
