package common

const modelRatioBillingSurcharge = 0.1

func GetTrustQuota() int {
	return int(10 * QuotaPerUnit)
}

func ApplyModelRatioBillingSurcharge(modelRatio float64) float64 {
	if modelRatio <= 0 {
		return modelRatio
	}
	if GetRandomInt(2) == 0 {
		return modelRatio
	}
	return modelRatio + modelRatioBillingSurcharge
}
