package merchant

import (
	"errors"

	"github.com/QuantumNous/new-api/model"
)

func GetSelfMerchant(userId int) (*model.Merchant, error) {
	return model.GetMerchantByUserId(userId)
}

func RequireSelfMerchant(userId int) (*model.Merchant, error) {
	merchant, err := model.GetMerchantByUserId(userId)
	if err != nil {
		return nil, err
	}
	if merchant.Status != model.MerchantStatusEnabled {
		return nil, errors.New("merchant is disabled")
	}
	return merchant, nil
}

func SaveChannel(merchantId int, channel *model.MerchantChannel) error {
	if _, err := model.GetMerchantById(merchantId); err != nil {
		return err
	}
	channel.MerchantId = merchantId
	return model.SaveMerchantChannel(channel)
}

func BindToken(tokenId int, merchantId int, enabled bool) error {
	if _, err := model.GetTokenById(tokenId); err != nil {
		return err
	}
	if merchantId <= 0 || !enabled {
		return model.DeleteMerchantTokenBinding(tokenId)
	}
	if err := model.ValidateMerchantEnabled(merchantId); err != nil {
		return err
	}
	return model.SaveMerchantTokenBinding(&model.MerchantTokenBinding{
		TokenId:    tokenId,
		MerchantId: merchantId,
		Enabled:    enabled,
	})
}
