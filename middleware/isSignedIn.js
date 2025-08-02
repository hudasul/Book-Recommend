function isSignedIn(req, res, next) {
  if (req.session.user && !req.session.user.isGuest) {
    return next();
  }

  const isPublic = req.originalUrl.startsWith("/books");

  if (isPublic) {
    return next(); 
  }

  res.redirect("/books");
}


module.exports = isSignedIn