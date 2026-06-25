package router

import (
	"github.com/QuantumNous/new-api/controller"
	"github.com/QuantumNous/new-api/middleware"

	"github.com/gin-gonic/gin"
)

func SetMerchantRouter(apiRouter *gin.RouterGroup) {
	merchantRoute := apiRouter.Group("/merchant")
	merchantRoute.Use(middleware.UserAuth())
	{
		merchantRoute.GET("/self", controller.GetMerchantSelf)
		merchantRoute.GET("/channels", controller.GetMerchantChannels)
		merchantRoute.PUT("/channels", controller.SaveMerchantChannel)
		merchantRoute.DELETE("/channels/:id", controller.DeleteMerchantChannel)
		merchantRoute.GET("/prices", controller.GetMerchantPrices)
		merchantRoute.PUT("/prices", controller.SaveMerchantPrice)
		merchantRoute.DELETE("/prices", controller.DeleteMerchantPrice)
		merchantRoute.GET("/settlements", controller.GetMerchantSettlements)
	}

	merchantAdminRoute := apiRouter.Group("/merchant/admin")
	merchantAdminRoute.Use(middleware.AdminAuth())
	{
		merchantAdminRoute.GET("/merchants", controller.AdminListMerchants)
		merchantAdminRoute.POST("/merchants", controller.AdminCreateMerchant)
		merchantAdminRoute.PUT("/merchants", controller.AdminUpdateMerchant)
		merchantAdminRoute.DELETE("/merchants/:id", controller.AdminDeleteMerchant)
		merchantAdminRoute.GET("/merchants/:id/channels", controller.AdminListMerchantChannels)
		merchantAdminRoute.PUT("/merchants/:id/channels", controller.AdminSaveMerchantChannel)
		merchantAdminRoute.DELETE("/merchants/:id/channels/:channel_id", controller.AdminDeleteMerchantChannel)
		merchantAdminRoute.GET("/settlements", controller.AdminListMerchantSettlements)
		merchantAdminRoute.PUT("/settlements", controller.AdminSaveMerchantSettlement)
		merchantAdminRoute.GET("/tokens/:id/binding", controller.AdminGetTokenMerchantBinding)
		merchantAdminRoute.PUT("/tokens/:id/binding", controller.AdminSetTokenMerchantBinding)
		merchantAdminRoute.DELETE("/tokens/:id/binding", controller.AdminDeleteTokenMerchantBinding)
	}
}
