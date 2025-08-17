class CreateSalesOrders < ActiveRecord::Migration[8.0]
  def change
    create_table :sales_orders do |t|
      # t.references :user, null: false, foreign_key: true   # who placed the order
      t.integer :user_id
      t.string :order_number, null: false   # human-readable order ref
      t.string :status, default: "pending"                # pending, completed, cancelled
      t.decimal :total_amount, precision: 10, scale: 2, default: 0.0
      t.timestamps
    end
    add_index :sales_orders, :order_number, unique: true
  end
end
