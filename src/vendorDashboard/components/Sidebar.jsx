import React from 'react'

const Sidebar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle

}) => {
  return (
    <div>
      <div className="sidebarSection">
        <ul>
          {showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : ""}

          <li onClick={showProductHandler}>Add Product</li>
          <li onClick={showAllProductsHandler}>All Products</li>
          <li>User Details</li>
        </ul>

      </div>
    </div>
  )
}

export default Sidebar
