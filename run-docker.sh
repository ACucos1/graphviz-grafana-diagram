docker run --rm \
  -p 3000:3000 \
  -v "$(pwd)":/var/lib/grafana/plugins/jdbranham-diagram-panel \
  --name=grafana \
  grafana/grafana:9.5.3
