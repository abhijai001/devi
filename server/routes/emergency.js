const express = require("express");
const router = express.Router();

const activeCases = new Map();

router.post("/create", (req, res) => {
  const { caseId, user, issue, location } = req.body;
  if (!caseId || !user || !issue) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  activeCases.set(caseId, {
    caseId,
    user,
    issue,
    location,
    startedAt: new Date().toISOString(),
    responders: [],
    active: true,
  });

  res.json({ success: true, caseId });
});

router.get("/:caseId", (req, res) => {
  const c = activeCases.get(req.params.caseId);
  if (!c) return res.status(404).json({ error: "Case not found." });
  res.json(c);
});

router.post("/:caseId/resolve", (req, res) => {
  const c = activeCases.get(req.params.caseId);
  if (!c) return res.status(404).json({ error: "Case not found." });
  c.active = false;
  c.resolvedAt = new Date().toISOString();
  res.json({ success: true });
});

router.post("/:caseId/responder", (req, res) => {
  const c = activeCases.get(req.params.caseId);
  if (!c) return res.status(404).json({ error: "Case not found." });
  c.responders.push({ ...req.body, joinedAt: new Date().toISOString() });
  res.json({ success: true });
});

module.exports = router;
