const router = express.Router(),
	middleware = require("../middleware/"),
	upload = require("../middleware/upload")
	billing = require("../app/billing.controller"),
	dashboard = require("../app/dashboard.controller");

router.get("/", middleware.jwt, dashboard.index);

router.put("/profile", [middleware.jwt, upload.default("avatar").any()], dashboard.profile);

router.put("/security", middleware.jwt, dashboard.security);

router.post("/billing/deposit/", [middleware.jwt, upload.default("bankdeposit").any()], billing.deposit);

router.post("/billing/withdraw", middleware.jwt, billing.withdraw);

router.get("/billing/return", middleware.jwt, billing.billingReturn);

router.get("/billing/transaction", middleware.jwt, billing.transaction);

router.get("/project", middleware.jwt, dashboard.project);

router.get("/project/search", middleware.jwt, dashboard.projectSearch);

router.get("/balance", middleware.jwt, dashboard.balance);

module.exports = router;