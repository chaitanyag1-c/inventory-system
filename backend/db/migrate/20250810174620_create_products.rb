class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :sku, null: false
      t.text :description
      t.decimal :price, precision: 10, scale: 2, default: 0.0
      t.integer :quantity, default: 0
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :products, :sku, unique: true
    add_index :products, :deleted_at
  end
end
