function isSignedIn(req, res, next) {
  // Only restrict access to signed-in users who aren't guests
  if (req.session.user && !req.session.user.isGuest) {
    return next();
  }

  // Allow guests only on certain public routes
  const publicRoutes = ["/books", "/books/genre", "/books/:id"];
  const isPublic = req.originalUrl.startsWith("/books");

  if (isPublic) {
    return next(); // allow access
  }

  res.redirect("/books");
}


module.exports = isSignedIn