import { helper } from '@ember/component/helper';

export default helper(function add([numb1, numb2] /*, named*/) {
  return numb1 + numb2;
});
