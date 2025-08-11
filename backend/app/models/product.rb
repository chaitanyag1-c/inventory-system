class Product < ApplicationRecord
  validates :name, presence: true
  validates :sku, presence: true, uniqueness: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }

  scope :available, -> { where(deleted_at: nil) }

  def soft_delete
    update(deleted_at: Time.current)
  end
end
