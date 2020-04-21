function registerSW() {
  console.log('Registering ServiceWorker.');
  navigator.serviceWorker.register('service-worker.js');
}

window.navigator.serviceWorker.onmessage = function (event) {
  if (event.data.command === 'SET_OFFLINE_READY')
    precorWorkout.setDefaultURL();
};
