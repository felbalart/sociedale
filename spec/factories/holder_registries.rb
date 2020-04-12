FactoryBot.define do
  factory :holder_registry do
    registry_date { "2020-04-12 15:24:50" }
    shareholder { nil }
    shares_count { 1 }
    paid_shares_count { 1 }
    subscription_date { "2020-04-12" }
    serie { "MyString" }
    category { "MyString" }
    share_price { "9.99" }
    equity_percentage { "9.99" }
    has_agreement { false }
    create_modif { nil }
    outdate_modif { nil }
    outdate_date { "2020-04-12 15:24:50" }
    has_collateral { false }
  end
end
