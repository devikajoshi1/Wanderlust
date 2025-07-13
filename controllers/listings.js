const Listing = require("../models/listing");
const Map = require("../models/map");
const cloudinary = require('cloudinary').v2;
//index
module.exports.index = async(req,res)=>{
   let allListings = await Listing.find({});
   res.render("listings/index",{allListings})
};

//new
module.exports.renderNewForm = (req, res) => {
  return res.render("listings/new.ejs");
};

//show listings
module,exports.showListing = async(req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).
  populate({path:"reviews",
    populate:{path:"author"}
  })
    .populate("owner");
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
     return res.redirect("/listings");
  }
  console.log("listing:",listing )
  res.render("listings/show.ejs", { listing });
};

//create listing


module.exports.createListing = async (req, res, next) => {
  const query = req.body.listing.location;
  let coords = { lat: 0, lng: 0 };

  // 1. Geocode using Nominatim
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`, {
    headers: { 'User-Agent': 'demo-app' }
  });

  if (!response.ok) {
    return res.status(500).send("Geocoding request failed");
  }

  const data = await response.json();

  if (data.length > 0) {
    coords = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  }

  // 2. Build listing with image, owner, and geometry
  const { path: url, filename } = req.file;

  const newListing = new Listing({
    ...req.body.listing,
    owner: req.user._id,
    image: { url, filename },
    geometry: {
      type: 'Point',
      coordinates: [coords.lng, coords.lat] // GeoJSON format
    }
  });

  const savedListing = await newListing.save();
  console.log('Saved:', savedListing);

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

// module.exports.createListing = async(req, res,next) => {
// const query = req.body.listing.location; // 1. declare query first

// let coords = { lat: 0, lng: 0 }; // default coords

// try {
//   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`, {
//     headers: { 'User-Agent': 'demo-app' }
//   });

//   const data = await response.json(); // 2. fix variable name


//   await Listing.create({
//     ...req.body.listing,
//     location: query,
//     coordinates: coords
//   });

// console.log('Latitude:', coords.lat);
// console.log('Longitude:', coords.lng);

// } catch (err) {
//   console.error(err);
//   res.status(500).send("Geocoding failed");
// }


//   let url = req.file.path;
//   let filename = req.file.filename;
//     const newListing = new Listing(req.body.listing); 
//     newListing.owner = req.user._id;
//     newListing.image = {url,filename};
//     newListing.geometry = {
//     type: 'Point',
//     coordinates: [lng, lat]
//   };
  
//    let savedListing = await newListing.save();
//    console.log(savedListing);
//    console.log('Latitude:', coords.lat);
//   console.log('Longitude:', coords.lng);
//     req.flash("success", "New Listing Created"); 
//     res.redirect("/listings");
// }

//edit
module.exports.renderEditForm = async(req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
     return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload", "/upload/w_250")
  res.render("listings/edit.ejs", { listing,originalImageUrl });
};

// //update 

// Update Listing Controller

module.exports.updateListing = async(req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
  }


  req.flash("success", " Listing Updated ");
  res.redirect(`/listings/${id}`);
};

//delete
module.exports.destroyListing =async(req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", " Listing Deleted");
  res.redirect("/listings");
}
