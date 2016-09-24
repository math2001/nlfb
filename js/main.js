$(document).ready(function() {
  Hash.init(EM);
  Path.init(EM);
  return new Items(Path, EM);
});
