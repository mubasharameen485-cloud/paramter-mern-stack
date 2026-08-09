import Product from "./model.js";

// ==============================================================
// 1. QUERY PARAMETER MAGIC (?) - Filtering, Sorting, Pagination
// URL Example: /api/products?category=Electronics&sort=-price&page=2&limit=5
// ==============================================================
export const getProducts = async (req, res) => {
  try {
    // 1️⃣ FILTERING: req.query se filtering fields nikalna
    // (Aisa set karna ke sort, page waghera filter me mix na hon)
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit"]; // Inko DB filter se nikal do
    excludedFields.forEach((el) => delete queryObj[el]);

    // Pehle hum apni query (find) banate hain, par usko await nahi karte, taake aage Sort lag sake
    let query = Product.find(queryObj); 

    // 2️⃣ SORTING: req.query.sort 
    // ?sort=price (sasti se mehngi)
    // ?sort=-price (mehngi se sasti, minus ka matlab descending)
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt"); // Default sorting (Newest first)
    }

    // 3️⃣ PAGINATION: req.query.page & req.query.limit
    // Frontend batayega konsa page chahiye aur 1 page pe kitne items hon.
    const page = Number(req.query.page) || 1; // Default page 1
    const limit = Number(req.query.limit) || 10; // Default 10 items per page
    const skip = (page - 1) * limit; // Skip logic: 2nd page pe pehle 10 item skip kardo

    query = query.skip(skip).limit(limit);

    // AB FINAL QUERY EXECUTE KARO
    const products = await query;
    const totalProducts = await Product.countDocuments(queryObj); // Total kitne hain (Frontend ke buttons ke liye)

    res.status(200).json({ 
      success: true, 
      count: products.length, 
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      data: products 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ==============================================================
// 2. PATH PARAMETER MAGIC (:) - Single Item Fetch karna
// URL Example: /api/products/64b5f8e3f9...
// ==============================================================
export const getSingleProduct = async (req, res) => {
  try {
    // req.params.id route wale ':id' se aata hai
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};