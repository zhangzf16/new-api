package model

import (
	"errors"
	"fmt"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/setting/ratio_setting"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

const (
	MerchantStatusEnabled  = 1
	MerchantStatusDisabled = 2

	MerchantChannelStatusEnabled  = 1
	MerchantChannelStatusDisabled = 2

	MerchantSettlementStatusPending = "pending"
	MerchantSettlementStatusPaid    = "paid"
)

type Merchant struct {
	Id          int    `json:"id"`
	UserId      int    `json:"user_id" gorm:"uniqueIndex;not null"`
	Name        string `json:"name" gorm:"type:varchar(128);not null"`
	Description string `json:"description" gorm:"type:text"`
	Status      int    `json:"status" gorm:"default:1;index"`
	CreatedTime int64  `json:"created_time" gorm:"bigint"`
	UpdatedTime int64  `json:"updated_time" gorm:"bigint"`
}

type MerchantChannel struct {
	Id                 int         `json:"id"`
	MerchantId         int         `json:"merchant_id" gorm:"index;not null"`
	Type               int         `json:"type" gorm:"default:0"`
	Key                string      `json:"key" gorm:"not null"`
	OpenAIOrganization *string     `json:"openai_organization"`
	TestModel          *string     `json:"test_model"`
	Status             int         `json:"status" gorm:"default:1;index"`
	Name               string      `json:"name" gorm:"index;not null"`
	Weight             *uint       `json:"weight" gorm:"default:0"`
	CreatedTime        int64       `json:"created_time" gorm:"bigint"`
	UpdatedTime        int64       `json:"updated_time" gorm:"bigint"`
	BaseURL            *string     `json:"base_url" gorm:"column:base_url;default:''"`
	Other              string      `json:"other"`
	Models             string      `json:"models"`
	Group              string      `json:"group" gorm:"type:varchar(64);default:'default'"`
	ModelMapping       *string     `json:"model_mapping" gorm:"type:text"`
	StatusCodeMapping  *string     `json:"status_code_mapping" gorm:"type:varchar(1024);default:''"`
	Priority           *int64      `json:"priority" gorm:"bigint;default:0"`
	AutoBan            *int        `json:"auto_ban" gorm:"default:1"`
	OtherInfo          string      `json:"other_info"`
	Tag                *string     `json:"tag" gorm:"index"`
	Setting            *string     `json:"setting" gorm:"type:text"`
	ParamOverride      *string     `json:"param_override" gorm:"type:text"`
	HeaderOverride     *string     `json:"header_override" gorm:"type:text"`
	Remark             *string     `json:"remark" gorm:"type:varchar(255)"`
	ChannelInfo        ChannelInfo `json:"channel_info" gorm:"type:json"`
	OtherSettings      string      `json:"settings" gorm:"column:settings"`
}

type MerchantTokenBinding struct {
	Id          int   `json:"id"`
	TokenId     int   `json:"token_id" gorm:"uniqueIndex;not null"`
	MerchantId  int   `json:"merchant_id" gorm:"index;not null"`
	Enabled     bool  `json:"enabled" gorm:"default:true;index"`
	CreatedTime int64 `json:"created_time" gorm:"bigint"`
	UpdatedTime int64 `json:"updated_time" gorm:"bigint"`
}

type MerchantModelPrice struct {
	Id                   int     `json:"id"`
	MerchantId           int     `json:"merchant_id" gorm:"uniqueIndex:idx_merchant_model_price;index;not null"`
	Model                string  `json:"model" gorm:"type:varchar(255);uniqueIndex:idx_merchant_model_price;not null"`
	ModelPrice           float64 `json:"model_price" gorm:"default:-1"`
	ModelRatio           float64 `json:"model_ratio" gorm:"default:-1"`
	CompletionRatio      float64 `json:"completion_ratio" gorm:"default:-1"`
	CacheRatio           float64 `json:"cache_ratio" gorm:"default:-1"`
	CacheCreationRatio   float64 `json:"cache_creation_ratio" gorm:"default:-1"`
	ImageRatio           float64 `json:"image_ratio" gorm:"default:-1"`
	AudioRatio           float64 `json:"audio_ratio" gorm:"default:-1"`
	AudioCompletionRatio float64 `json:"audio_completion_ratio" gorm:"default:-1"`
	CreatedTime          int64   `json:"created_time" gorm:"bigint"`
	UpdatedTime          int64   `json:"updated_time" gorm:"bigint"`
}

type MerchantSettlement struct {
	Id          int    `json:"id"`
	MerchantId  int    `json:"merchant_id" gorm:"index;not null"`
	Amount      int64  `json:"amount" gorm:"bigint;default:0"`
	Currency    string `json:"currency" gorm:"type:varchar(16);default:'USD'"`
	Status      string `json:"status" gorm:"type:varchar(32);default:'pending';index"`
	Remark      string `json:"remark" gorm:"type:text"`
	CreatedTime int64  `json:"created_time" gorm:"bigint"`
	UpdatedTime int64  `json:"updated_time" gorm:"bigint"`
}

func GetMerchantByUserId(userId int) (*Merchant, error) {
	merchant := &Merchant{}
	err := DB.Where("user_id = ?", userId).First(merchant).Error
	return merchant, err
}

func GetMerchantById(id int) (*Merchant, error) {
	merchant := &Merchant{}
	err := DB.First(merchant, "id = ?", id).Error
	return merchant, err
}

func ListMerchants(startIdx, num int) ([]*Merchant, int64, error) {
	var merchants []*Merchant
	var total int64
	query := DB.Model(&Merchant{})
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	err := query.Order("id desc").Limit(num).Offset(startIdx).Find(&merchants).Error
	return merchants, total, err
}

func CreateMerchant(merchant *Merchant) error {
	now := common.GetTimestamp()
	merchant.CreatedTime = now
	merchant.UpdatedTime = now
	if merchant.Status == 0 {
		merchant.Status = MerchantStatusEnabled
	}
	return DB.Create(merchant).Error
}

func UpdateMerchant(merchant *Merchant) error {
	merchant.UpdatedTime = common.GetTimestamp()
	return DB.Model(merchant).Select("name", "description", "status", "updated_time").Updates(merchant).Error
}

func DeleteMerchant(id int) error {
	return DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Delete(&Merchant{}, "id = ?", id).Error; err != nil {
			return err
		}
		if err := tx.Delete(&MerchantChannel{}, "merchant_id = ?", id).Error; err != nil {
			return err
		}
		if err := tx.Delete(&MerchantTokenBinding{}, "merchant_id = ?", id).Error; err != nil {
			return err
		}
		if err := tx.Delete(&MerchantModelPrice{}, "merchant_id = ?", id).Error; err != nil {
			return err
		}
		return nil
	})
}

func ListMerchantChannels(merchantId int) ([]*MerchantChannel, error) {
	var channels []*MerchantChannel
	err := DB.Where("merchant_id = ?", merchantId).Order("id desc").Find(&channels).Error
	return channels, err
}

func SaveMerchantChannel(channel *MerchantChannel) error {
	now := common.GetTimestamp()
	channel.UpdatedTime = now
	if channel.CreatedTime == 0 {
		channel.CreatedTime = now
	}
	if channel.Status == 0 {
		channel.Status = MerchantChannelStatusEnabled
	}
	channel.Name = strings.TrimSpace(channel.Name)
	channel.Models = strings.Trim(channel.Models, ", ")
	channel.Group = strings.TrimSpace(channel.Group)
	if channel.Name == "" {
		return errors.New("name is required")
	}
	if channel.Key == "" {
		return errors.New("key is required")
	}
	if channel.Models == "" {
		return errors.New("models is required")
	}
	if channel.Group == "" {
		channel.Group = "default"
	}
	if channel.MerchantId <= 0 {
		return errors.New("merchant_id is required")
	}
	if channel.Id > 0 {
		return DB.Model(&MerchantChannel{}).
			Where("id = ? and merchant_id = ?", channel.Id, channel.MerchantId).
			Updates(channel).Error
	}
	return DB.Create(channel).Error
}

func DeleteMerchantChannel(merchantId, id int) error {
	return DB.Where("merchant_id = ? and id = ?", merchantId, id).Delete(&MerchantChannel{}).Error
}

func ListMerchantPrices(merchantId int) ([]*MerchantModelPrice, error) {
	var prices []*MerchantModelPrice
	err := DB.Where("merchant_id = ?", merchantId).Order("model asc").Find(&prices).Error
	return prices, err
}

func SaveMerchantModelPrice(price *MerchantModelPrice) error {
	now := common.GetTimestamp()
	price.UpdatedTime = now
	if price.CreatedTime == 0 {
		price.CreatedTime = now
	}
	price.Model = strings.TrimSpace(price.Model)
	if price.Model == "" {
		return errors.New("model is required")
	}
	return DB.Clauses(clause.OnConflict{
		Columns: []clause.Column{{Name: "merchant_id"}, {Name: "model"}},
		DoUpdates: clause.AssignmentColumns([]string{
			"model_price", "model_ratio", "completion_ratio", "cache_ratio", "cache_creation_ratio",
			"image_ratio", "audio_ratio", "audio_completion_ratio", "updated_time",
		}),
	}).Create(price).Error
}

func DeleteMerchantModelPrice(merchantId int, modelName string) error {
	return DB.Where("merchant_id = ? and model = ?", merchantId, modelName).Delete(&MerchantModelPrice{}).Error
}

func GetMerchantModelPrice(merchantId int, modelName string) (*MerchantModelPrice, bool, error) {
	if merchantId <= 0 || strings.TrimSpace(modelName) == "" {
		return nil, false, nil
	}
	price := &MerchantModelPrice{}
	err := DB.Where("merchant_id = ? and model = ?", merchantId, modelName).First(price).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		matchName := ratio_setting.FormatMatchingModelName(modelName)
		if matchName == modelName {
			return nil, false, nil
		}
		price = &MerchantModelPrice{}
		err = DB.Where("merchant_id = ? and model = ?", merchantId, matchName).First(price).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, false, nil
		}
	}
	if err != nil {
		return nil, false, err
	}
	return price, true, nil
}

func ListMerchantSettlements(merchantId int, startIdx, num int) ([]*MerchantSettlement, int64, error) {
	var settlements []*MerchantSettlement
	var total int64
	query := DB.Model(&MerchantSettlement{})
	if merchantId > 0 {
		query = query.Where("merchant_id = ?", merchantId)
	}
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	err := query.Order("id desc").Limit(num).Offset(startIdx).Find(&settlements).Error
	return settlements, total, err
}

func SaveMerchantSettlement(settlement *MerchantSettlement) error {
	now := common.GetTimestamp()
	settlement.UpdatedTime = now
	if settlement.CreatedTime == 0 {
		settlement.CreatedTime = now
	}
	if settlement.Status == "" {
		settlement.Status = MerchantSettlementStatusPending
	}
	if settlement.Currency == "" {
		settlement.Currency = "USD"
	}
	return DB.Save(settlement).Error
}

func GetActiveMerchantTokenBinding(tokenId int) (*MerchantTokenBinding, bool, error) {
	binding := &MerchantTokenBinding{}
	err := DB.Where("token_id = ? and enabled = ?", tokenId, true).First(binding).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, false, nil
	}
	if err != nil {
		return nil, false, err
	}
	return binding, true, nil
}

func SaveMerchantTokenBinding(binding *MerchantTokenBinding) error {
	now := common.GetTimestamp()
	binding.UpdatedTime = now
	if binding.CreatedTime == 0 {
		binding.CreatedTime = now
	}
	return DB.Clauses(clause.OnConflict{
		Columns: []clause.Column{{Name: "token_id"}},
		DoUpdates: clause.AssignmentColumns([]string{
			"merchant_id", "enabled", "updated_time",
		}),
	}).Create(binding).Error
}

func DeleteMerchantTokenBinding(tokenId int) error {
	return DB.Where("token_id = ?", tokenId).Delete(&MerchantTokenBinding{}).Error
}

func GetMerchantChannel(group string, modelName string, retry int, merchantId int) (*Channel, error) {
	if merchantId <= 0 {
		return nil, nil
	}
	normalizedModel := ratio_setting.FormatMatchingModelName(modelName)

	var rows []*MerchantChannel
	if err := DB.Where("merchant_id = ? and status = ?", merchantId, MerchantChannelStatusEnabled).
		Order("id desc").
		Find(&rows).Error; err != nil {
		return nil, err
	}
	matched := make([]*MerchantChannel, 0)
	for _, row := range rows {
		if merchantChannelMatches(row, group, modelName) || merchantChannelMatches(row, group, normalizedModel) {
			matched = append(matched, row)
		}
	}
	priorities := make([]int64, 0)
	prioritySeen := make(map[int64]bool)
	for _, row := range matched {
		priority := row.GetPriority()
		if !prioritySeen[priority] {
			prioritySeen[priority] = true
			priorities = append(priorities, priority)
		}
	}
	if len(priorities) == 0 {
		return nil, nil
	}
	for i := 0; i < len(priorities)-1; i++ {
		for j := i + 1; j < len(priorities); j++ {
			if priorities[i] < priorities[j] {
				priorities[i], priorities[j] = priorities[j], priorities[i]
			}
		}
	}
	if retry >= len(priorities) {
		retry = len(priorities) - 1
	}
	priority := priorities[retry]

	candidates := make([]*MerchantChannel, 0)
	for _, row := range matched {
		if row.GetPriority() == priority {
			candidates = append(candidates, row)
		}
	}

	weightSum := 0
	for _, row := range candidates {
		weightSum += row.GetWeight() + 10
	}
	weight := common.GetRandomInt(weightSum)
	selected := candidates[0]
	for _, row := range candidates {
		weight -= row.GetWeight() + 10
		if weight <= 0 {
			selected = row
			break
		}
	}
	return selected.ToRuntimeChannel(), nil
}

func merchantChannelMatches(channel *MerchantChannel, group string, modelName string) bool {
	if channel == nil {
		return false
	}
	if !stringListContains(channel.Group, group) {
		return false
	}
	return stringListContains(channel.Models, modelName)
}

func stringListContains(list string, value string) bool {
	value = strings.TrimSpace(value)
	if value == "" {
		return false
	}
	for _, item := range strings.Split(list, ",") {
		if strings.TrimSpace(item) == value {
			return true
		}
	}
	return false
}

func (channel *MerchantChannel) GetPriority() int64 {
	if channel.Priority == nil {
		return 0
	}
	return *channel.Priority
}

func (channel *MerchantChannel) GetWeight() int {
	if channel.Weight == nil {
		return 0
	}
	return int(*channel.Weight)
}

func (channel *MerchantChannel) ToRuntimeChannel() *Channel {
	return &Channel{
		Id:                 -channel.Id,
		Type:               channel.Type,
		Key:                channel.Key,
		OpenAIOrganization: channel.OpenAIOrganization,
		TestModel:          channel.TestModel,
		Status:             channel.Status,
		Name:               channel.Name,
		Weight:             channel.Weight,
		CreatedTime:        channel.CreatedTime,
		BaseURL:            channel.BaseURL,
		Other:              channel.Other,
		Models:             channel.Models,
		Group:              channel.Group,
		ModelMapping:       channel.ModelMapping,
		StatusCodeMapping:  channel.StatusCodeMapping,
		Priority:           channel.Priority,
		AutoBan:            channel.AutoBan,
		OtherInfo:          channel.OtherInfo,
		Tag:                channel.Tag,
		Setting:            channel.Setting,
		ParamOverride:      channel.ParamOverride,
		HeaderOverride:     channel.HeaderOverride,
		Remark:             channel.Remark,
		ChannelInfo:        channel.ChannelInfo,
		OtherSettings:      channel.OtherSettings,
	}
}

func ValidateMerchantEnabled(merchantId int) error {
	merchant, err := GetMerchantById(merchantId)
	if err != nil {
		return err
	}
	if merchant.Status != MerchantStatusEnabled {
		return fmt.Errorf("merchant %d is disabled", merchantId)
	}
	return nil
}
