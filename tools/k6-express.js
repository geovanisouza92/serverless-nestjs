import http from 'k6/http';

export let options = {
  vus: 100,
  duration: '1m',
};

export default function() {
  http.get('https://0ijlhzq709.execute-api.us-east-1.amazonaws.com/dev/express');
}
