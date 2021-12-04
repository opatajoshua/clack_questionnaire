import Model, { attr } from '@ember-data/model';

export default class QuestionnaireModel extends Model {
  @attr identifier;
  @attr name;
  @attr questions; //could use hasMany but will pass raw array to rest serializer for simplicity of test
  @attr description;
  @attr category_name_hyphenated;
}
