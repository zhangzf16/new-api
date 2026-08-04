package service

import (
	"testing"

	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/stretchr/testify/assert"
)

func TestConsumeLogModelName(t *testing.T) {
	tests := []struct {
		name string
		info *relaycommon.RelayInfo
		want string
	}{
		{
			name: "mapped request keeps origin model",
			info: &relaycommon.RelayInfo{
				OriginModelName: "client-model",
				ChannelMeta: &relaycommon.ChannelMeta{
					UpstreamModelName: "provider-model",
				},
			},
			want: "client-model",
		},
		{
			name: "request without channel metadata uses origin model",
			info: &relaycommon.RelayInfo{OriginModelName: "client-model"},
			want: "client-model",
		},
		{
			name: "nil relay info",
			want: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.want, consumeLogModelName(tt.info))
		})
	}
}
