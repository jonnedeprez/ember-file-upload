import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

var { get } = Ember;

moduleFor('service:file-queue');

test('the uploaded size of the uploader is the aggregate of all queues', function (assert) {
  var uploader = this.subject();
  var queue1 = uploader.create('queue1');

  assert.equal(get(uploader, 'files.length'), 0);
  assert.equal(get(uploader, 'size'), 0);
  assert.equal(get(uploader, 'loaded'), 0);
  assert.equal(get(uploader, 'progress'), 0);

  queue1.push({
    id: 'test',
    name: 'test-filename.jpg',
    size: 2000,
    loaded: 500
  });

  assert.equal(get(uploader, 'files.length'), 1);
  assert.equal(get(uploader, 'size'), 2000);
  assert.equal(get(uploader, 'loaded'), 500);
  assert.equal(get(uploader, 'progress'), 25);

  var queue2 = uploader.create('queue2');

  queue2.push({
    id: 'test1',
    name: 'test-filename.jpg',
    size: 3500,
    loaded: 500
  });

  assert.equal(get(uploader, 'files.length'), 2);
  assert.equal(get(uploader, 'size'), 5500);
  assert.equal(get(uploader, 'loaded'), 1000);
  assert.equal(get(uploader, 'progress'), 18);

  uploader.create('queue3');

  queue2.push({
    id: 'test2',
    name: 'test-filename.jpg',
    size: 1400,
    loaded: 1000
  });

  assert.equal(get(uploader, 'files.length'), 3);
  assert.equal(get(uploader, 'size'), 6900);
  assert.equal(get(uploader, 'loaded'), 2000);
  assert.equal(get(uploader, 'progress'), 28);
});
