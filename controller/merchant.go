package controller

import (
	"errors"
	"strconv"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	merchantservice "github.com/QuantumNous/new-api/service/merchant"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetMerchantSelf(c *gin.Context) {
	merchant, err := merchantservice.GetSelfMerchant(c.GetInt("id"))
	if errors.Is(err, gorm.ErrRecordNotFound) {
		common.ApiSuccess(c, nil)
		return
	}
	if err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, merchant)
}

func GetMerchantChannels(c *gin.Context) {
	merchant, err := merchantservice.RequireSelfMerchant(c.GetInt("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	channels, err := model.ListMerchantChannels(merchant.Id)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, channels)
}

func SaveMerchantChannel(c *gin.Context) {
	merchant, err := merchantservice.RequireSelfMerchant(c.GetInt("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	channel := &model.MerchantChannel{}
	if err := c.ShouldBindJSON(channel); err != nil {
		common.ApiError(c, err)
		return
	}
	if err := merchantservice.SaveChannel(merchant.Id, channel); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, channel)
}

func DeleteMerchantChannel(c *gin.Context) {
	merchant, err := merchantservice.RequireSelfMerchant(c.GetInt("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	channelId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	if err := model.DeleteMerchantChannel(merchant.Id, channelId); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, nil)
}

func GetMerchantPrices(c *gin.Context) {
	merchant, err := merchantservice.RequireSelfMerchant(c.GetInt("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	prices, err := model.ListMerchantPrices(merchant.Id)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, prices)
}

func SaveMerchantPrice(c *gin.Context) {
	merchant, err := merchantservice.RequireSelfMerchant(c.GetInt("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	price := &model.MerchantModelPrice{}
	if err := c.ShouldBindJSON(price); err != nil {
		common.ApiError(c, err)
		return
	}
	price.MerchantId = merchant.Id
	if err := model.SaveMerchantModelPrice(price); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, price)
}

func DeleteMerchantPrice(c *gin.Context) {
	merchant, err := merchantservice.RequireSelfMerchant(c.GetInt("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	modelName := strings.TrimSpace(c.Query("model"))
	if modelName == "" {
		common.ApiErrorMsg(c, "model is required")
		return
	}
	if err := model.DeleteMerchantModelPrice(merchant.Id, modelName); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, nil)
}

func GetMerchantSettlements(c *gin.Context) {
	merchant, err := merchantservice.RequireSelfMerchant(c.GetInt("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	pageInfo := common.GetPageQuery(c)
	settlements, total, err := model.ListMerchantSettlements(merchant.Id, pageInfo.GetStartIdx(), pageInfo.GetPageSize())
	if err != nil {
		common.ApiError(c, err)
		return
	}
	pageInfo.SetTotal(int(total))
	pageInfo.SetItems(settlements)
	common.ApiSuccess(c, pageInfo)
}

func AdminListMerchants(c *gin.Context) {
	pageInfo := common.GetPageQuery(c)
	merchants, total, err := model.ListMerchants(pageInfo.GetStartIdx(), pageInfo.GetPageSize())
	if err != nil {
		common.ApiError(c, err)
		return
	}
	pageInfo.SetTotal(int(total))
	pageInfo.SetItems(merchants)
	common.ApiSuccess(c, pageInfo)
}

func AdminCreateMerchant(c *gin.Context) {
	merchant := &model.Merchant{}
	if err := c.ShouldBindJSON(merchant); err != nil {
		common.ApiError(c, err)
		return
	}
	if merchant.UserId <= 0 || strings.TrimSpace(merchant.Name) == "" {
		common.ApiErrorMsg(c, "user_id and name are required")
		return
	}
	if err := model.CreateMerchant(merchant); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, merchant)
}

func AdminUpdateMerchant(c *gin.Context) {
	merchant := &model.Merchant{}
	if err := c.ShouldBindJSON(merchant); err != nil {
		common.ApiError(c, err)
		return
	}
	if merchant.Id <= 0 {
		common.ApiErrorMsg(c, "id is required")
		return
	}
	if strings.TrimSpace(merchant.Name) == "" {
		common.ApiErrorMsg(c, "name is required")
		return
	}
	if err := model.UpdateMerchant(merchant); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, merchant)
}

func AdminDeleteMerchant(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	if err := model.DeleteMerchant(id); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, nil)
}

func AdminListMerchantChannels(c *gin.Context) {
	merchantId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	channels, err := model.ListMerchantChannels(merchantId)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, channels)
}

func AdminSaveMerchantChannel(c *gin.Context) {
	merchantId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	channel := &model.MerchantChannel{}
	if err := c.ShouldBindJSON(channel); err != nil {
		common.ApiError(c, err)
		return
	}
	if err := merchantservice.SaveChannel(merchantId, channel); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, channel)
}

func AdminDeleteMerchantChannel(c *gin.Context) {
	merchantId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	channelId, err := strconv.Atoi(c.Param("channel_id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	if err := model.DeleteMerchantChannel(merchantId, channelId); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, nil)
}

func AdminListMerchantSettlements(c *gin.Context) {
	pageInfo := common.GetPageQuery(c)
	merchantId, _ := strconv.Atoi(c.Query("merchant_id"))
	settlements, total, err := model.ListMerchantSettlements(merchantId, pageInfo.GetStartIdx(), pageInfo.GetPageSize())
	if err != nil {
		common.ApiError(c, err)
		return
	}
	pageInfo.SetTotal(int(total))
	pageInfo.SetItems(settlements)
	common.ApiSuccess(c, pageInfo)
}

func AdminSaveMerchantSettlement(c *gin.Context) {
	settlement := &model.MerchantSettlement{}
	if err := c.ShouldBindJSON(settlement); err != nil {
		common.ApiError(c, err)
		return
	}
	if settlement.MerchantId <= 0 {
		common.ApiErrorMsg(c, "merchant_id is required")
		return
	}
	if err := model.SaveMerchantSettlement(settlement); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, settlement)
}

func AdminGetTokenMerchantBinding(c *gin.Context) {
	tokenId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	binding, found, err := model.GetActiveMerchantTokenBinding(tokenId)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	if !found {
		common.ApiSuccess(c, nil)
		return
	}
	common.ApiSuccess(c, binding)
}

func AdminSetTokenMerchantBinding(c *gin.Context) {
	tokenId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	var req struct {
		MerchantId int  `json:"merchant_id"`
		Enabled    bool `json:"enabled"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		common.ApiError(c, err)
		return
	}
	if err := merchantservice.BindToken(tokenId, req.MerchantId, req.Enabled); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, nil)
}

func AdminDeleteTokenMerchantBinding(c *gin.Context) {
	tokenId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		common.ApiError(c, err)
		return
	}
	if err := model.DeleteMerchantTokenBinding(tokenId); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, nil)
}
