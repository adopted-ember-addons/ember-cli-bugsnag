/*jshint node:true*/
module.exports = {
  useYarn: true,
  scenarios: [
    {
      name: "ember-2.18",
      npm: {
        devDependencies: {
          "ember-source": "2.18.0"
        }
      }
    }
  ]
};
