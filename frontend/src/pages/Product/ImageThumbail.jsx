import React from 'react';

const ImageThumbnail = ({ image_url, alt, size = 120 }) => {
  if (!image_url) return null;
  return (
    <div style={{ marginBottom: 16, textAlign: 'center' }}>
      <img
        src={image_url}
        alt={alt || 'Product Thumbnail'}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: 6,
          border: '1px solid #eee'
        }}
      />
      <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>Current Image</div>
    </div>
  );
};

export default ImageThumbnail;
