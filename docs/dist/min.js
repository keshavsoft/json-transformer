const u = ({ inItems: c, inRecipe: t }) => {
  const n = c, e = t;
  return n.map((r) => i({ inSource: r, inRecipe: e })).flat(1 / 0).filter(Boolean);
}, p = ({ inSource: c, inTransform: t }) => {
  const n = c, e = t, r = {};
  for (const [l, s] of Object.entries(n)) {
    if (!(l in e))
      continue;
    const o = e[l], f = (o == null ? void 0 : o.alterKey) || l;
    let a = s;
    "transform" in o && (a = i({
      inSource: s,
      inRecipe: o
    })), (o == null ? void 0 : o.valueType) === "array" && !Array.isArray(a) && (a = [a]), o != null && o.valueKey && a && typeof a == "object" && (a = a[o.valueKey]), r[f] = a;
  }
  return r;
}, y = ({ inSource: c, inRecipe: t }) => {
  const n = c, e = t;
  let r = n;
  e && typeof e == "object" && "transform" in e && (r = p({
    inSource: n,
    inTransform: e.transform
  }));
  for (const [l, s] of Object.entries(r))
    Array.isArray(s) && e && l in e && (r[l] = u({
      inItems: s,
      inRecipe: e[l]
    }));
  return r;
}, i = ({ inSource: c, inRecipe: t }) => {
  const n = c, e = t;
  return Array.isArray(n) ? u({
    inItems: n,
    inRecipe: e
  }) : typeof n == "object" && n !== null ? y({
    inSource: n,
    inRecipe: e
  }) : n;
}, m = (c, t) => i({
  inSource: c,
  inRecipe: t
});
export {
  m as default
};
