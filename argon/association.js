/**
Provides association capabilities to argon, this is a module and should be included
on all the models that require association.
@module Association
@namespace Argon
**/
Module(Argon, 'Association')({

  /**
  Creates a hasOne method on the class running the method, this creates the "associationName"
  method on the object running the method. This is a factory method
  @method <public> hasOne
  @argument <required> [Object] ({}) config
  @return this
  **/
  hasOne  : function hasOne(config) {
    var association;

    association = {
      type           : 'HAS_ONE',
      name           : config.name,
      cardinality    : 'one',
      targetModel    : config.targetModel,
      localProperty  : config.localProperty,
      targetProperty : config.targetProperty
    };

    this.prototype[association.name] = function(callback){
      var model = this;

      var targetModel = global;

      association.targetModel.split('.').forEach(function (property) {
        targetModel = targetModel[property];
      });

      targetModel.all(function (err, data) {
        var result = data.filter(function (instance) {
          return instance[association.targetProperty] === model[association.localProperty];
        });

        callback(err, data);
      });
    };

    return this;
  },

  /**
  Creates a hasMany method on the class running the method, this creates the "associationName"
  method on the object running the method. This is a factory method
  @method <public> hasMany
  @argument <required> [Object] ({}) config
  @return this
  **/
  hasMany : function hasMany(config) {
    var association;
    association = {
      type           : 'HAS_MANY',
      name           : config.name,
      cardinality    : 'many',
      targetModel    : config.targetModel,
      localProperty  : config.localProperty,
      targetProperty : config.targetProperty
    };

    this.prototype[association.name] = function(callback){
      var model = this;
      var targetModel = global;

      association.targetModel.split('.').forEach(function (property) {
        targetModel = targetModel[property];
      });

      targetModel.all(function (err, data) {
        var result = data.filter(function (instance) {
          return instance[association.targetProperty] === model[association.localProperty];
        });

        callback(err, data);
      });
    };

    return this;
  },

  /**
  Creates a belongsTo method on the class running the method, this creates the "associationName"
  method on the object running the method. This is a factory method.
  @method <public> belongsTo
  @argument <required> [Object] ({}) config
  @return this
  **/
  belongsTo  : function belongsTo(config) {
    var association;

    association = {
      type           : 'BELONGS_TO',
      name           : config.name,
      cardinality    : 'one',
      targetModel    : config.targetModel,
      localProperty  : config.localProperty,
      targetProperty : config.targetProperty
    };

    this.prototype[association.name] = function (callback) {
      var model = this;
      var targetModel = global;

      association.targetModel.split('.').forEach(function (property) {
        targetModel = targetModel[property];
      });

      targetModel.all(function (err, data) {
        var result = data.filter(function (instance) {
          return instance[association.targetProperty] === model[association.localProperty];
        });

        callback(err, data);
      });
    };

    return this;
  }
});
