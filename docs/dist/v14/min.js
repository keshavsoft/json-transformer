const y = ({ inItems: n, inRecipe: c, inExecute: t }) => {
  const e = n, o = c, r = t;
  return e.map((i) => p({
    inSource: i,
    inRecipe: o,
    inExecute: r
  })).flat(1 / 0).filter(Boolean);
}, E = ({ inSource: n, inRecipe: c, inExecute: t }) => {
  const e = n, o = c, r = t;
  let i = e;
  typeof r == "function" && (i = r({
    inSource: e,
    inRecipe: o
  }));
  for (const [s, l] of Object.entries(i))
    Array.isArray(l) && o && s in o && (i[s] = y({
      inItems: l,
      inRecipe: o[s],
      inExecute: r
    }));
  return i;
}, p = ({ inSource: n, inRecipe: c, inExecute: t }) => {
  const e = n, o = c, r = t;
  return Array.isArray(e) ? y({
    inItems: e,
    inRecipe: o,
    inExecute: r
  }) : typeof e == "object" && e !== null ? E({
    inSource: e,
    inRecipe: o,
    inExecute: r
  }) : e;
}, S = ({ inKey: n, inDirective: c }) => {
  const t = n, e = c;
  return (e == null ? void 0 : e.alterKey) || t;
}, R = ({ inValue: n, inDirective: c, inExecute: t }) => {
  const e = n, o = c, r = t;
  return o && "transform" in o ? p({
    inSource: e,
    inRecipe: o,
    inExecute: r
  }) : e;
}, F = ({ inValue: n, inDirective: c }) => {
  const t = n, e = c;
  return (e == null ? void 0 : e.valueType) === "array" && !Array.isArray(t) ? [t] : t;
}, $ = ({ inValue: n, inDirective: c }) => {
  const t = n, e = c;
  return e != null && e.valueKey && t && typeof t == "object" ? t[e.valueKey] : t;
}, O = ({ inSource: n, inTransform: c, inExecute: t }) => {
  const e = n, o = c, r = t, i = {};
  for (const [s, l] of Object.entries(e)) {
    if (!(s in o))
      continue;
    const a = o[s], x = S({ inKey: s, inDirective: a });
    let u = l;
    u = R({
      inValue: u,
      inDirective: a,
      inExecute: r
    }), u = F({ inValue: u, inDirective: a }), u = $({ inValue: u, inDirective: a }), i[x] = u;
  }
  return i;
};
function m(n, c) {
  for (const t in n)
    typeof n[t] == "object" && n[t] !== null ? m(n[t], c) : typeof n[t] == "string" && n[t] === "${}" && (n[t] = c);
  return n;
}
const A = ({ inSource: n, inOperation: c, inExecute: t }) => {
  const e = n, o = c;
  for (const [r, i] of Object.entries(o))
    if ("operationType" in i && i.operationType === "loopArray" && r in e) {
      const s = e[r].map((l) => {
        const a = structuredClone(i == null ? void 0 : i.template);
        return m(a, l), a;
      });
      e[r] = s;
    }
  return e;
}, f = ({ inSource: n, inRecipe: c }) => {
  let t = n;
  const e = c;
  return e && typeof e == "object" && "transform" in e && (t = O({
    inSource: t,
    inTransform: e.transform,
    inExecute: f
  })), e && typeof e == "object" && "operation" in e && (t = A({
    inSource: t,
    inOperation: e.operation,
    inExecute: f
  })), t;
}, d = (n, c) => p({
  inSource: n,
  inRecipe: c,
  inExecute: f
});
export {
  d as default,
  f as execute,
  d as transform,
  p as traverse
};
