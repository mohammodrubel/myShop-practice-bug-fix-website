const loadProducts = () => {
    const url = 'https://fakestoreapi.com/products';
    fetch(url)
      .then((response) => response.json())
      .then((data) => showProducts(data));
  };
  loadProducts();
  
  // show all product in UI 
  const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        console.log(product)
      const image = product.images;
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `<div class="single-product">
        <div>
      <img class="product-image" src=${product.image}></img>
        </div>
        <h4>${product.title}</h4>
        <p>Category: ${product.category}</p>
        <p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></p>
        <p>global ratings:${product.rating.rate}   TotalCount ${product.rating.count} </p>
        <h3>Price: $ ${product.price}</h3>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Information</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p> Main website link: <a href="https://fakestoreapi.com/">fakestorepi.com</a></p> </br>
                <p> API Link: <a href="https://fakestoreapi.com/products">https://fakestoreapi.com/products</a></p> </br>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
        </div>
        </div>
        `;
      document.getElementById("all-products").appendChild(div);
    
    }
  };
  let count = 0;
  const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);
  
    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
  };
  
  const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
    
  };
  
  // main price update function
  const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = parseFloat(total).toFixed(2);
  };
  
  // set innerText function
  const setInnerText = (id, value) => {
    document.getElementById(id).innerText = parseFloat(value).toFixed(2);
     updateTotal()
  };
  
  // update delivery charge and total Tax
  const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
      setInnerText("delivery-charge", 30);
      setInnerText("total-tax", parseFloat(priceConverted * 0.2).toFixed(2));
    }
    if (priceConverted > 400) {
      setInnerText("delivery-charge", 50);
      setInnerText("total-tax", parseFloat(priceConverted * 0.3).toFixed(2));
    }
    if (priceConverted > 500) {
      setInnerText("delivery-charge", 60);
      setInnerText("total-tax", parseFloat(priceConverted * 0.4).toFixed(2));
    }
     updateTotal()
  };
  
  //grandTotal update function
  const updateTotal = () => {
    const grandTotal =
      getInputValue("price") + getInputValue("delivery-charge") +
      getInputValue("total-tax");
    document.getElementById("total").innerText =parseFloat(grandTotal).toFixed(2) ;
  };
  updateTotal()




