class CreateSalesOrderLines < ActiveRecord::Migration[8.0]
  def change
    create_table :sales_order_lines do |t|
      t.references :sales_order, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.integer :quantity, null: false, default: 1
      t.decimal :price, precision: 10, scale: 2, null: false  # snapshot of product price
      t.decimal :line_total, precision: 10, scale: 2, null: false
      t.timestamps
    end
  end
end
