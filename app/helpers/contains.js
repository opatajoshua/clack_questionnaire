import { helper } from '@ember/component/helper';

export default helper(function contains(
  [stack, needle, ...others] /*, named*/
) {
  return stack && stack.includes(needle);
});
