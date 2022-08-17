import { Router } from 'express';
const router = Router();
router.get("/healthcheck", (req, res) => {
  try {
    res.send({
      uptime: Math.round(process.uptime()),
      message: "OK",
      timestamp: Date.now(),
    });
  } catch (e) {
    res.status(503).end();
  }
});
export default router;
