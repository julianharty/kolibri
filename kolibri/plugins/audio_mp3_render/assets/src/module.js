
const ContentRendererModule = require('content_renderer_module');
const AudioComponent = require('./vue/index');

class AudioMP3Module extends ContentRendererModule {
  get rendererComponent() {
    return AudioComponent;
  }
}

module.exports = new AudioMP3Module();
