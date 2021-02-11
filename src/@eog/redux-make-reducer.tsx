export default function(t: any, n: any) {
  return function(r: any, e: any) {
    void 0 === r && (r = n);
    var u = t[e.type];
    return u ? u(r, e) : r;
  };
}
