<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{

    #[Route(
        '/{reactRouting}',
        name: 'app_react',
        priority: '-1',
        defaults: ['reactRouting' => null],
        requirements: ['reactRouting' => '.+']
    )]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'ReactController',
        ]);
    }
}
