<?php

namespace App\Controller;

use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ExchangeController extends AbstractController
{

    #[Route('/api/exchange', name: 'app_exchange', methods: 'get')]
    public function exchange()
    {
        $req_url = 'https://v6.exchangerate-api.com/v6/cf0d85312e979ad2fc210a12/latest/USD';

        $response_json = file_get_contents($req_url);

        if ($response_json !== false) {

            try {
                $response = json_decode($response_json);

                if ($response->result  === 'success') {

                    $currencyValue = $response->conversion_rates;

                    return $this->json(['data' => [
                        "Emirates Derham (AED)" => $currencyValue->AED,
                        "British Pound (GBP)" => $currencyValue->GBP,
                        "Iranian Rial (IRR)" => $currencyValue->IRR,
                        "Euro (EUR)" => $currencyValue->EUR,
                        "Japanese Yen (JPY)" => $currencyValue->JPY,
                    ]]);
                }
            } catch (Exception $e) {

                return $this->json(['data' => "free account limit!"]);
            }
        }
    }
}
