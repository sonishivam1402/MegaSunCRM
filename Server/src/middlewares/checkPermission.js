// middleware/checkPermission.js
export const checkPermission = (action, pageName) => {
  return (req, res, next) => {
    const userPermissions = req.user.menus; // from DB

    const page = userPermissions.find(p => p.Name === pageName);
    //console.log(page);
    if (!page || !page[action]) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};